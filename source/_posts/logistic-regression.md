title: Logistic 回归
date: 2015-10-05 14:50
category: 机器学习
tags:
- 机器学习
- Logistic 回归
- Logistic Regression
mathjax: true
---

最近项目需要，用到了 Logistic 回归（Logistic Regression），因此又跟着 Andrew Ng 的机器学习课程复习了一遍相关知识，整理如下：

## 一、问题的引入
使用线性回归方法是可以引申来处理分类问题的，一般是用回归得到假设值 $h\_\theta (x)$ 来决定类别归属。例如：$h\_\theta (x) < 0.5$ 时，y = 0；$h_\theta (x) > 0.5$ 时，y = 1。

然而，线性回归得到的假设值 $h\_\theta (x)$ 有可能 >1 或是 <0，而且有可能会超出很多，这种情况下使用线性回归似乎不是很好的选择。

为了解决这个问题，我们引入 Logistic 回归方法，将 $h\_\theta (x)$ 限制在 (0,1) 范围内。

注意，Logistic 回归是一种**分类**方法，而不是回归方法，名字中的“回归”是历史原因造成的。

<!--more-->
## 二、Logistic 函数（Logistic Function）
线性回归中，假设函数 $h\_\theta (x)=\theta ^\top x$，这里将截距"藏"在了向量中，即$\theta=[\theta_0, \theta_1, \cdots, \theta_n]^\top$，$x=[1, x_1, x_2, \cdots, x_n]^\top$。

而在 Logistic 回归中，我们使用一个函数来**限制假设函数的值域**，这个函数就叫做 Logistic 函数（Logistic Function，也叫 Sigmoid Function）。

Logistic Function：$$g(z)=\frac{1}{1+e^{-z}}$$

它的函数图像：
{% asset_img Logistic-curve.png 逻辑回归函数图像 %}

从图像中可以看出，逻辑回归函数将输入的$(-\infty, \infty)$空间映射到了$(0,1)$空间，即将值域限制在了$(0,1)$之内。 限制后的假设函数为：

$$h\_\theta (x)=g(\theta ^\top x)=\frac{1}{1+e^{-\theta ^\top x}}$$

注意该假设函数中，只有一个参数：$\theta$，我们接下来就需要通过优化来求解这个参数，以确定分类模型。

## 三、假设函数的直观解释
由于假设函数的值域为$(0,1)$，而$h\_\theta (x)$值越接近1，就越有可能是 y=1 类；反之$h\_\theta (x)$值越接近0，越有可能是 y=0 类。

这样看来，假设函数 $h\_\theta (x)$ 可以看做是给定 x，其类别 y=1 的估计概率，即

$$h\_\theta (x)=P(y=1 \mid x;\theta )$$

## 四、寻求优化参数 $\theta$
一般来说，寻找参数的过程就是优化目标函数的过程。

### 4.1 线性回归的目标函数

在线性回归中，我们的目标函数为：
$$J(\theta )=\frac{1}{m} \sum\_{i=1}^m \frac{1}{2} (h\_\theta (x^{(i)})-y^{(i)})^2$$
其中，$\frac{1}{2} (h\_\theta (x^{(i)})-y^{(i)})^2$ 部分就是损失函数，即$Cost(h\_\theta (x^{(i)}), y^{(i)})$

线性回归的优化目标就是最小化这个目标函数，即让各个样本点的误差达到最小。

### 4.2 Logistic 回归的目标函数

#### 4.2.1 平方形式的损失函数

我们把 Logistic 回归的假设函数 $h\_\theta (x)=\frac{1}{1+e^{-\theta ^\top x}}$ 代入到线性回归的损失函数中，得到：

$$Cost(h\_\theta (x), y) = \frac{1}{2} (h\_\theta (x)-y)^2 = \frac{1}{1+e^{-\theta ^\top x}}$$

为简便起见，这里以后，将各个点的误差$h\_\theta (x^{(i)})-y^{(i)}$简写为$h\_\theta (x)-y$。

然而，这样的损失函数代入$J(\theta )=\frac{1}{m} \sum\limits\_{i=1}^m Cost(h\_\theta x, y)$ 中，得到的目标函数 $J(\theta )$ 并非凸函数，其函数图像类似下图的左子图。

{% asset_img convex-function.png 非凸函数和凸函数 %}

只有目标函数是凸函数时，我们才能通过各种优化方法（如梯度下降、牛顿法等）找到极值点，进而得到最优值对应的参数。 因此，Logistic 回归需要调整其损失函数形式，以使得目标函数为凸函数。

#### 4.2.2 对数形式的损失函数

Logistic 回归采用的损失函数为：
$$Cost(h\_\theta (x), y)=
\begin{cases} -log(h\_\theta (x)) &\text{if y=1} \\\
-log(1-h\_\theta (x)) &\text{if y=0} \end{cases}$$

这两个函数 $-log(h\_\theta (x))$，$-log(1-h\_\theta (x))$ 的函数图像如下图所示。可以看出，当 y=1 时，随着 $h\_\theta (x)$ 逐渐趋近于 0（即趋向于“分错类别”），损失函数将剧烈上升，趋向于 $\infty$，而当 $h\_\theta (x)$ 逐渐趋近于 1（即趋向于“分对类别”） 时，损失函数则会逐渐减小到 0。当 y=0 时，情况类似。

可见，当分错类别时，这个损失函数会得到一个比较大的损失，进而来惩罚分类算法。

{% asset_img cost-function.png 损失函数 %}

##### 简化损失函数

上面对数形式损失函数是分段形式的，我们可以将两个式子压缩成一个式子：
$$Cost(h\_\theta (x), y) = -ylog(h\_\theta (x)) -(1-y)log(1-h\_\theta (x))$$

当 y=0 时，取后半段；当 y=1 时，取前半段。

由此，我们终于得到了 Logistic 回归的目标函数$J(\theta)$：
$$\begin{align} J(\theta) & = \frac{1}{m} \sum\_{i=1}^m Cost(h\_\theta(x^{(i)}), y^{(i)}) \\\
& = -\frac{1}{m} [\sum\_{i=1}^m y^{(i)}log h\_\theta(x^{(i)}) + (1-y^{(i)})log (1-h\_\theta (x^{(i)}))] \\\ \end{align}$$

### 4.3 优化目标函数求参

优化目标函数：$\min\_{\theta} J(\theta)$，即可得到参数 $\theta$

那么，如何优化目标函数呢？优化方法有很多种，这里讲一下“梯度下降法”：

#### 4.3.1 梯度下降法（Gradient Descent）

梯度下降法的原理这里不详细解释了，方法比较直观，网上有很多教程可以参考。

梯度下降法的使用很简单：在目标函数上任找一点开始，让参数 $\theta$ 不断朝着梯度方向迭代，直到收敛，收敛时函数位于极小值处，此时的 $\theta$ 即为 $\min\_{\theta} J(\theta)$。

每一步迭代的形式化定义如下：
$$\theta\_j := \theta\_j - \alpha \frac{\partial}{\partial \theta\_j} J(\theta)$$

这里引入了一个新的参数：$\alpha$，表示迭代速度，在这里作为调控因子。另外式子中 $J(\theta)$ 关于 $\theta$ 的梯度可以计算得到：
$$\frac{\partial}{\partial \theta\_j} J(\theta) = \frac{1}{m} \sum\_{i=1}^m(h\_\theta (x^{(i)}) - y^{(i)})x\_j^{(i)}$$

此外，还要注意的是，梯度下降法迭代时，是所有参数：$\theta\_0, \theta\_1, \cdots, \theta\_n$ 同时迭代的，这个可以以向量形式进行批量计算。

在梯度下降中，需要计算$\sum\_{i=1}^m (h\_\theta (x^{(i)}) - y^{(i)})x\_j^{(i)}$，也就是每一个样本 $x^{(i)}$ 都要参与计算。这样在样本量较大时，难免效率底下。有一些改进的方法来解决这个问题，例如随机梯度下降法等，这里就不展开了。

## 五、用求得的参数进行分类

使用求得的参数 $\theta$，进而预测新的未知变量 $x$：
$$h\_\theta(x)=\frac{1}{1+e^{-\theta ^\top x}}$$
之前提过了，这个 $h\_\theta(x)$ 直观意义为：给定 x，其类别 y=1 的估计概率，即$h\_\theta (x)=P(y=1 \mid x;\theta )$ 因此，我们有了 $h\_\theta(x)$，就能确定未知样本的分类了。
