---
title: 我对卷积的理解
date: 2015-10-06 20:05:00
tags:
  - 数学
  - 卷积
  - 图像处理
  - 机器学习
  - 基础概念
  - Gabor 特征
category: 图像处理
mathjax: true
---
{% image https://d1aeqfcn0xwy4s.cloudfront.net/images/convolution/banner.jpeg %}

在学习机器学习和图像处理的过程中，经常会遇到卷积这个概念。我每次遇到这个概念都有点似懂非懂的样子。有时候清楚它的直观解释，但又搞不清公式中是如何体现的。究其原因，还是我没有完全搞懂这个概念。 维基百科上有一个动态图来演示这个概念，但对于我来说还是有些复杂。于是自己在网上找了很多文章来研究，终于有了比较直观的印象，这里就趁热把我理解的解释一下，作为总结。

## 一、一维卷积

### 1.1 数学定义

维基百科上，卷积的形式化定义如下：
$$ f(x)*g(x) = \int_{-\infty}^{\infty} f(\tau)g(x-\tau) d\tau \tag{1} $$

### 1.2 直观解释

先来分析一下这个公式：

1. $f(x)*g(x)$ 表示 $f(x)$ 和 $g(x)$ 的卷积，注意此处自变量为 $x$；
2. 它是对 $(-\infty, \infty)$ 区间上对 $\tau$ 求积分；
3. 积分对象为两个函数的乘积：$f(\tau)$ 和 $g(x-\tau)$。
4. 等式右边只有 $g(x-\tau)$ 提到了 $x$，其他部分都在关注 $\tau$

这样一个公式恐怕还是难以理解，接下来将通过一个例子来进行解释。

<!-- more -->
### 1.3 例子

试想小明有一段时间每天都要去输液，输的药会在身体里残留直至失效，药效随着时间是不断衰落的。 这里为简便起见，假设药效 4 天就失效，而且药效持续函数是离散的。如下图所示：

{% image https://d1aeqfcn0xwy4s.cloudfront.net/images/convolution/conv-effect-function.png 药效持续函数 %}

图中，横坐标为天数，纵坐标为药效。输液当天（day=0）药效为 100%，第二天减弱为 80%，第三天减弱为 40%，第四天减弱为 0。

现在先定义一些符号：
记天数为 $t$，每天输液的药量为 $\operatorname{m}(t)$, 药效函数为 $\operatorname{eff}(t)$，小明身上残留的药效为 $\operatorname{rest}(t)$
其中药效函数：
$$\operatorname{eff}(t) = 
\begin{cases} 100 \% & \text{t=0}  \\
80 \% & \text{t=1}  \\
40 \% & \text{t=2}  \\
0  \% & \text{t>=3}  \\
\end{cases}$$

下面观察一下小明从第一天起，连续三天输液后身上所留下的药效（假设每天药量固定为10）。
- 第一天，小明去医院输完液后，药效为 10（$\operatorname{rest}(t) = \operatorname{m}(t)\cdot \operatorname{eff}(0)$）。

{% image https://d1aeqfcn0xwy4s.cloudfront.net/images/convolution/conv-effect-day1.png 第一天累积的药效示意 %}

- 第二天，小明去医院准备输液
    - 输液前，他身上带着前一天的药效，此时已经衰减为 10$\cdot$ 80%=8，即 $\operatorname{m}(t-1)\cdot \operatorname{eff}(1)$。
    - 输液后，他身上携带的药效为：8 + 10 = 18（$\operatorname{rest}(t) = \operatorname{m}(t-1)\cdot \operatorname{eff}(1) + \operatorname{m}(t)\cdot \operatorname{eff}(0)$）

{% image https://d1aeqfcn0xwy4s.cloudfront.net/images/convolution/conv-effect-day2.png 第二天累积的药效示意 %}

- 第三天，小明去医院准备输液
    - 输液前，他身上带着前两天的药效，第一天的此时已衰减为 10$\cdot$ 40%=4（$\operatorname{m}(t-2)\cdot \operatorname{eff}(2)$），第二天的此时衰减为 10$\cdot$ 80%=8（$\operatorname{m}(t-1)\cdot \operatorname{eff}(1)$）。
    - 输液后，他身上携带的药效为：4 + 8 + 10 = 22（$\operatorname{rest}(t) = \operatorname{m}(t-2)\cdot \operatorname{eff}(2) + \operatorname{m}(t-1)\cdot \operatorname{eff}(1) + \operatorname{m}(t)\cdot \operatorname{eff}(0)$）。

{% image https://d1aeqfcn0xwy4s.cloudfront.net/images/convolution/conv-effect-day3.png 第三天累积的药效示意 %}

### 1.4 分析

从上面的分析我们可以得到，小明第 $t$ 天身上残留的药效 $\operatorname{rest}(t) = \sum_{i=1}^n \operatorname{m}(t-i) \operatorname{eff}(i)$，其中 $n$ 为药效有效的最大天数。 我们不难想象，但药效函数 $\operatorname{eff}(t)$ 为连续时，上式中的求和就应改为积分；而当药效能无限期有效时，上式中 $n$ 就为 $\infty$。 无限期有效的药效函数，所对应的 $\operatorname{rest}(t) = \int_{-\infty}^\infty \operatorname{m}(t-\tau) \operatorname{eff}(\tau) \,d\tau$（本例中严格来说应该是 $\int_0^\infty$ ，这里推广到了 $(-\infty, \infty)$）。推导到这里，基本就是维基百科上卷积的定义了。

### 1.5 总结

我之前对卷积概念的困惑主要是因为对公式 (1) 的那个 $\tau$ 的意义理解错了，总以为 $\tau$ 是随着坐标轴变化的量。 事实上，在上面举的例子中，**$\tau$ 是作为沿着纵坐标遍历的量：它的作用是对「纵向」上，历次函数 $\operatorname{eff}(t)$ 在当前点($t$)残余量($\operatorname{rest}(t)$)的求和。积分也是对纵向上的积分，而非横向上沿自变量的积分**。

横坐标变化的量始终为 $t$，而且在卷积中并没有明显体现出 $t$ 的变化。

最后重新回顾一下上面的整个过程：比较三天以来的示意图可以发现，如果我们以「当天」而不是第 $t$ 天为参考的话，就会看到 $\operatorname{eff}(t)$ 随着时间是在向左平移（深蓝的线表示当天，前几天的线都在其左边），然后各天衰落后的药量残余等于 $\operatorname{eff}(t)$ 值乘上初始的药量值，最后将各天的药量残余求个和。整个过程的核心就是 **「（反转），移动，乘积，求和」**，这里面「反转」的概念也好理解，就是本来 $\operatorname{eff}(t)$ 是 **「朝着右边」** 走的函数，$t=0,t=1,\cdots$，$\operatorname{eff}(t)$ 是形容 **t 天后的药量的**，然而实际例子中我们是以当天为参考系，我们是在 **「朝着左边」** 看的，因而要「反转」。我认为这个「反转」是一个很自然的过程，不算是整个卷积的核心。 此外，在计算机领域，至少我接触到的图像处理、机器学习方面用到的卷积，其卷积核（就是例子中不断平移的函数 $\operatorname{eff}(t)$）一般是对称的，所以这个反转的概念也不是那么必要。

## 二、二维卷积

### 2.1 数学定义

$$ f(x, y)* g(x, y) = \int_{\tau_1=-\infty}^\infty \int_{\tau_2=-\infty}^{\infty} f(\tau_1, \tau_2) \cdot g(x-\tau_1, y-\tau_2)\,d\tau_1 d\tau_2 \tag{2} $$

二维卷积在图像处理中会经常遇到，图像处理中用到的大多是二维卷积的离散形式：

$$ f[x,y] * g[x,y] = \sum_{n_1=-\infty}^\infty \sum_{n_2=-\infty}^\infty f[n_1, n_2] \cdot g[x-n_1, y-n_2] \tag{3} $$

### 2.2 图像处理中的二维卷积

二维卷积就是一维卷积的扩展，原理差不多。核心还是**（反转），移动，乘积，求和**。这里二维的反转就是将卷积核沿反对角线翻转，比如：
$$\begin{bmatrix} 
    a & b & c \\
    d & e & f \\
    g & h & i \\
    \end{bmatrix}
\text{翻转为} \begin{bmatrix}
    i & h & g \\
    f & e & d \\
    c & b & a \\
    \end{bmatrix}$$

之后，卷积核在二维平面上平移，并且卷积核的每个元素与被卷积图像对应位置相乘，再求和。通过卷积核的不断移动，我们就有了一个新的图像，这个图像完全由卷积核在各个位置时的乘积求和的结果组成。

举一个最简单的均值滤波的例子：
$$ \text{这是一个 3x3 的均值滤波核，也就是卷积核：}
\begin{bmatrix}
    1/9 & 1/9 & 1/9 \\
    1/9 & 1/9 & 1/9 \\
    1/9 & 1/9 & 1/9 \\
\end{bmatrix} \\
\text{这是被卷积图像，这里简化为一个二维 5x5 矩阵：}
\begin{bmatrix}
    3 & 3 & 3 & 3 & 3 \\
    4 & 4 & 4 & 4 & 4 \\
    5 & 5 & 5 & 5 & 5 \\
    6 & 6 & 6 & 6 & 6 \\
    7 & 7 & 7 & 7 & 7 \\
\end{bmatrix} \\
$$

当卷积核运动到图像右下角处（卷积中心和图像对应图像第 4 行第 4 列）时，它和图像卷积的结果如下图所示：

{% image https://d1aeqfcn0xwy4s.cloudfront.net/images/convolution/2d-convolution.png 二维卷积示例 %}

可以看出，二维卷积在图像中的效果就是：对图像的每个像素的邻域（邻域大小就是核的大小）加权求和得到该像素点的输出值。滤波器核在这里是作为一个「权重表」来使用的。

参考资料：
---
1. [中文维基百科/卷积](https://zh.wikipedia.org/wiki/%E5%8D%B7%E7%A7%AF)
2. [斯坦福大学CS178课程资料（有一个卷积的在线Applet演示）](https://graphics.stanford.edu/courses/cs178/applets/convolution.html)
3. [Understanding Convolution（用图和例子从一维卷积一直讲到了CNN）](http://colah.github.io/posts/2014-07-Understanding-Convolutions)

版权声明：
---
本文中所有文字、图片版权均属本人所有，如需转载请注明来源。
