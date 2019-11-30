---
title: 复数的几种表示形式
date: 2015-10-06 14:47:16
updated: 2015-10-06 14:47:16
category: 图像处理
tags:
- 傅里叶变换
- 欧拉公式
- 复数
- 数字信号处理
- 图像处理
- 基础概念
- Gabor 特征
mathjax: true
---

研究傅里叶变换的过程中经常要和复数打交道，经常会遇到 $e^{ix}$ 这种形式。

这里就总结一下复数的直角坐标、极坐标，以及复指数表示形式，也有对欧拉公式的直观解释，以便更好地理解傅里叶变换。

本文中图片均来自于 [国立台湾师范大学资讯工程学系的演算法笔记](http://www.csie.ntnu.edu.tw/~u91029/Wave.html)。

<!--more-->

## 一、复数的直角坐标表示

首先，复数基本单位是 $i=\sqrt{-1}$，有了这个单位，复数空间中的每个数都可以表示为 $a+bi$ 的形式。其中，a 被称为“实部（real part）”，b 被称为“虚部（imaginary part）”。

复数可以在复平面（complex plane）上表示，复平面横纵坐标分别为实部和虚部，下图就是复数 $2+3i$ 在复平面上的表示。

{% asset_img complex-plane.png  复平面 %}

我们可以发现，这个复平面和实数空间的直角坐标系类似。那可不可以用极坐标的方法表示复数呢？

## 二、复数的极坐标表示

事实上，复数是可以用极坐标表示的，那一个复数用极坐标表示时的长度和角度分别是多少呢？我们可以在复平面中计算出来。

例如，复数 $4+3i$ 的复平面直角坐标表示是$(4, 3)$，原点指向该点的向量长度 $r=\sqrt{3^2+4^2}=5$，向量的角度 $\theta = arctan(\frac{3}{4})$。

{% asset_img complex-polar-plane.png 复数的极坐标表示 %}

这里，复数极坐标表示的长度 $r$ 也被称为“强度（magnitude）”，角度 $\theta$ 也被称为“相位（phase）”。

### 2.1 由复数极坐标得到直角坐标

上面我们用复数的直角坐标计算出了极坐标，那么是不是也可以由极坐标推出直角坐标呢？我们还是从复平面中来看：

{% asset_img complex-polar-transform.png  复数两种表示形式之间的转换 %}

从上图可以看出，当我们有复数极坐标 $(r, \theta)$ 时，我们可以得到其直角坐标 $(r \cos(\theta), r \sin(\theta))$，即该复数为 $r\cos\theta + r\*i\sin\theta$。

## 三、复数的复指数表示与欧拉公式
欧拉有一天发现，神奇数字 $e$ 的纯虚数次方竟然在复数平面上绕圈！

用极坐标形式表示，就是 $e^{i\theta}=\cos\theta+i\sin\theta$。

如此，一个复数就又多了一种指数的表示形式，即复指数形式：$r e^{i\theta} = r \cos\theta + r\*i \sin\theta$。

而当 $r=1$，$\theta=\pi$ 时，对应的直角坐标刚好就是 $(-1, 0)$ ，也就是实数 -1。由此就有了那个著名的“欧拉公式”：$$e^{i\pi}+1=0$$

### 3.1 复数波和实数波

实数波我们比较熟悉，就是 $\sin\theta$ 或 $\cos\theta$ 形式。而复数波则是由 $e^{i\theta}$ 来定义，实数波和复数波的示意图如下：

{% asset_img real-wave-complex-wave.png  实数波和复数波示意 %}

从示意图中，可以看出，当俯视复数波时，观察到的投影即是一个实数波，即是 $e^{i\theta}=\cos\theta + i\* \sin\theta$ 的实部：$\cos\theta$；当从左侧侧视复数波时，得到的投影即是其虚部：$\sin\theta$。

事实上，复数波的完整定义为：
$$ Ae^{i(\omega t+\phi)} = Ae^{i(2\pi f t+\phi)} = A\cos(2\pi f t+\phi) + iA\sin(2\pi f t+\phi) $$
其中，$A$为振幅，$\omega$为角速度，$f$为频率，$\phi$为初试相位，这个波的强度（magnitude）为 $A = \sqrt{A^2 \cdot \cos^2(2\pi f t+\phi) + A^2 \cdot \sin^2(2\pi f t+\phi)}$，瞬时相位（phase）为 $2\pi f t + \phi$。

由于复指数形式的复数波$e^{i\theta}$相较于$\cos(\theta)+i\sin(\theta)$更简单且更易于控制，因而在信号处理中得到广泛的使用。除此之外，$e^{i\theta}$形式可以看作是实数波的基础，因为我们可以组合两个复数波来得到$\cos(\theta)$和$\sin(\theta)$：

$$\cos(\theta)=\frac{e^{i\theta}+e^{-i\theta}}{2}$$
$$\sin(\theta)=\frac{e^{i\theta}-e^{-i\theta}}{2i}$$
    
另外，在信号处理中，我们只需要考虑实部的线性运算，因此，在我们对一个复数波进行滤波后，得到的复数波可以分解为 $\cos$ 和 $\sin$ 的形式，进而只需要选取实部所对应的 $\cos$ 部分就行了。

在傅里叶变换中，便是将任意非周期函数分解为了各种复数波叠加的形式，因而傅里叶变换的公式中才会有类似 $e^{ix}$ 的形式。

### 参考资料：
1. [国立台湾师范大学资讯工程学系的演算法笔记](http://www.csie.ntnu.edu.tw/~u91029/Wave.html)
2. [斯坦福大学 JULIUS O. SMITH III 所著 Introduction to Digital Filters with Audio Applications 在线版](https://ccrma.stanford.edu/~jos/fp/Complex_Sinusoids.html)
