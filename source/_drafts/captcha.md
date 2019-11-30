---
title: captcha
tags:

mathjax: true
---
# 分析验证码样本图片
从工商系统获取到22515张图片，经测量没有出现重复样本，推测验证码应该是由服务器即时生成的随机图片，没有用缓存策略。
![验证码样本](/img/captcha/samples.png)
## 概览所有样本
分析发现，验证码样本可分为两类：成语类和运算类。二者分别有以下特征：
- 成语类：
    - 4 个字符
    - 每个字符约为30像素 x 30像素大小
    - 出现的字符不固定，总集合较大，几乎涵盖所有中文成语中出现的字符
- 运算类
    - 5 个字符，每个字符约为26像素x26像素大小。
    - 每个字符
    - 有一定模式，出现的字符集合确定
    - 共有三种模式：“N加N等于”，“N减N等于”，“N乘N等于”，
    其中 N $\in$ {“零”，“壹”，“贰”，“叁”，“肆”，“伍”，“陆”，“柒”，“捌”，“玖”}

经以上分析，发现“运算类”验证码识别目标较为确定，便于标注训练及验证分类效果，因此主要考虑识别此类验证码。

## 分析单个样本
![单个运算类验证码样本](/img/captcha/sample.jpg)
上图为某“运算类”验证码样本，对其进一步分析发现验证码图片有以下几个特点：
1. 杂点噪声
    图片背景分布有随机椒盐噪声
2. 线段噪声
    图片前景分布有随机方向、随机长度、随机颜色的线段噪声。注意到线段是遮盖在文字上方的，且线段颜色和文字颜色相差并不大。
3. 颜色对比度较低
	前景和背景的且颜色的对比度较低，前景和背景颜色都很暗淡，区分度不高。而且放大图片后发现，文字周围还有一圈“红晕”。

# 第一次实验

## 总体思路
{% plantuml %}
(*) -right--> "下载验证码"
-right--> "去除线段"
-right--> "调用tesseract进行字符识别"
{% endplantuml %}

## 实验总览
{% plantuml %}
state "灰度化" as grayscale
state "二值化" as binary

[*] -right--> grayscale
grayscale -right--> binary 
binary -right--> edge
binary -down--> line

[*] -down--> cluster

state "边缘检测" as edge {
state "canny 检测边缘" as canny
[*] --> canny
}

state "检测线段" as line {

state "霍夫变换" as hough
state "轮廓模型" as contour
state "垂直直方图投影" as vhist
state "分割字符" as segment
state "中值滤波" as median
state "LSD 线段检测" as lsd
[*] --> hough

[*] --> contour
contour --> vhist
vhist --> segment

[*] --> median
median --> hough

[*] --> median
median --> contour

[*] --> median 
median --> median : 两次中值滤波
median --> vhist

[*] --> lsd
}

state "颜色聚类" as cluster {

state "K-means 聚类" as kmeans
state "区域生长法" as regiongrow
[*] --> kmeans

[*] --> regiongrow
}

{% endplantuml %}

## 预处理及分割尝试
首先，转换样本图片为灰度图片：
![灰度处理](/img/captcha/grayscale.png)
再通过大津法（Ostu）将图片二值化
![二值化（大津法）](/img/captcha/binary.png)

### 检测边缘
对图片用canny算子检测边缘：
![检测边缘](/img/captcha/edge.png)
这个方法可以去除杂点，然而，被线段干扰较大

### 去除线段
#### 霍夫变换
直接使用matlab vision包提供的HoughTransform检测线段，并在原图中，将检测的线段用白色覆盖，得到的结果如下：
检测到的线段：
![霍夫变换检测线段](/img/captcha/hough-line.png)
![霍夫变换去除线段](/img/captcha/hough.png)

#### 轮廓模型（蛇模型）+垂直直方图投影
使用matlab中的activecontour函数检测字符轮廓，从而滤除线段，得到的结果如下：
![蛇模型检测轮廓](/img/captcha/contour.png)
注意，此方法要求先给定字符所在位置。

批量应用轮廓模型分割字符位置结果：
![批量应用轮廓模型分割字符位置结果](/img/captcha/batch-contour.png)

#### 中值滤波
考虑到杂点和杂线宽度较窄，使用中值滤波试图过滤掉杂点和杂线：
![中值滤波结果](/img/captcha/median.png)

##### 中值滤波+轮廓模型+垂直直方图投影
先通过中值滤波去除杂点，同时得到较为“干净”的图片，之后用干净图片作为mask，应用activecontour函数检测字符轮廓，最后，用垂直直方图投影确定字符位置。得到结果如下：
![中值滤波+轮廓模型](/img/captcha/median-contour.png)

批量应用结果：
![批量中值滤波+轮廓模型](/img/captcha/batch-median-contour.png)

##### 两次中值滤波+垂直直方图投影+宽度阈值
连续应用两次中值滤波，通过垂直直方图投影确定字符位置，最后用宽度阈值过滤，得到有效图像，结果如下：
![两次中值滤波+垂直直方图投影+宽度阈值](/img/captcha/mmedian-width-threshold.png)

#### LSD 检测线段
##### 形态学算子+LSD检测线段+后处理
1. 形态学算子预处理去除杂点
![形态学算子预处理去除杂点](/img/captcha/lsd-pre.png)

2. LSD 算法检测线段：
![LSD算法检测线段](/img/captcha/lsd-line.png)
3. LSD 算法滤除线段：
![LSD算法滤除线段](/img/captcha/lsd-line-remove.png)

4. 形态学算子后处理去除杂点、杂线
![形态学算子后处理去除杂点](/img/captcha/lsd-post.png)


### 颜色聚类
#### K-means
直接使用 K-means 对图片进行聚类：
![K-means全局聚类](/img/captcha/kmeans.png)

#### 区域生长法
使用区域生长算法，从种子点开始，将附近像素相似的点聚为一类：
![区域生长法（需给定种子点）](/img/captcha/region-grow.png)

# 第二次实验
## 总体思路
不考虑滤除线段，直接转换空间得到特征表示，再训练分类器进行分类。

{% plantuml %}
state "预处理" as preproc:   "形态学算子：开运算"
state "分割字符" as segment: "二维核密度估计"
state "后处理" as postproc:  "连通区域分析"
state "提取特征" as feature: "Gabor 特征"
state "分类" as classify:    "Logistic 回归"

[*] -right--> preproc
preproc -right--> segment
segment -right--> postproc
postproc -down--> feature
feature -left--> classify
{% endplantuml %}

> TODO: 完成后续部分

## 预处理

## 分割

## 后处理

## 提取特征

#### 分类
