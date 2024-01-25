---
title: 线性代数拾遗（六）：特征值与特征向量
date: 2016-07-01
category: 线性代数
tags:
  - 线性代数拾遗
  - 线性代数
  - 基础概念
  - 数学
mathjax: true
---
{% image https://blog.mengqi.life/images/linear-algebra-6/banner.jpeg %}

{% post_link linear-algebra-5 上一章 %}最后，我们引入了`马尔可夫链`。`马尔可夫链`简单来说就是一个个状态组成的链，其中每个状态只于前一个状态有关。然而，除了这个简单定义之外，`马尔可夫链`还有一个有趣的性质：`平稳分布`。要解释`平稳分布`是什么，我们先从一个例子讲起。

<!-- more -->

# 一、马尔可夫链的平稳分布

比如一个地区有三个政党：「民主党」、「共和党」、「自由党」，我们用一个向量 $\mathbf{x} \in \mathbb{R}^3$ 来表示每年选举的投票结果:

$$
\begin{bmatrix}
\text{民主党得票率} \\
\text{共和党得票率} \\
\text{自由党得票率}
\end{bmatrix}
$$

假设每年的选举结果只和上一年的结果有关，即选举向量构成的序列满足马尔可夫性质，是一个`马尔可夫链`。那么，像 {% post_link linear-algebra-5 上一章 %} 那个人口迁移的例子一样，我们可以用一个`状态迁移矩阵`来描述每年选举结果的变化情况。

比如我们要研究某一年开始，该地区选举变化情况，而且已经得到了该地区选举变化的迁移矩阵 $\mathbf{P}$：
$$
\mathbf{P}=
\begin{bmatrix}
0.5 & 0.2 & 0.3 \\
0.3 & 0.8 & 0.3 \\
0.2 & 0   & 0.4
\end{bmatrix}
$$

假设在起始年，三个党的得票情况为：$\mathbf{x}_0 = \begin{bmatrix}1\\ 0\\ 0 \end{bmatrix}$。那么我们顺着迁移矩阵看一下接下来几年，这个地区的选举情况会发生怎么样的变化。通过递推公式 $\mathbf{x}_{i+1} = \mathbf{P} \mathbf{x}_i$ 我们可以计算出
$$
\mathbf{x}_1 =  \begin{bmatrix} 0.5 \\ 0.3 \\ 0.2 \end{bmatrix}, \mathbf{x}_2 = \begin{bmatrix} 0.37 \\ 0.45 \\ 0.18 \end{bmatrix}, \mathbf{x}_3 =  \begin{bmatrix} 0.329 \\ 0.525 \\ 0.146 \end{bmatrix}, \cdots, \mathbf{x}_7 = \begin{bmatrix} 0.3016 \\ 0.5953 \\ 0.1031 \end{bmatrix}, \mathbf{x}_8 = \begin{bmatrix} 0.3008 \\ 0.5977 \\ 0.1016 \end{bmatrix}, \mathbf{x}_9 = \begin{bmatrix} 0.3004 \\ 0.5988 \\ 0.1008 \end{bmatrix} \cdots 
$$
我们可以发现，这个选举结果向量 $\mathbf{x}$ 越来越逼近于向量 $\mathbf{q} = \begin{bmatrix}0.3\\ 0.6\\ 0.1\end{bmatrix}$。事实上，当我们把迁移矩阵乘上这个向量：
$$
\mathbf{P}\mathbf{q}=
\begin{bmatrix}
0.5 & 0.2 & 0.3 \\
0.3 & 0.8 & 0.3 \\
0.2 & 0   & 0.4
\end{bmatrix}
\begin{bmatrix} 0.3\\ 0.6\\ 0.1 \end{bmatrix}
=
\begin{bmatrix} 0.3\\ 0.6\\ 0.1 \end{bmatrix}
= \mathbf{q}
$$
就会发现，不但选举结果越来越趋向某一个固定向量 $\mathbf{q}$，而且当结果达到和 $\mathbf{q}$ 一致时，这个系统便不再改变！这也就是我们所说的达到`平稳分布`。这个固定向量 $\mathbf{q}$ 就是 `稳态向量`。

可以证明，这个`稳态向量`由`迁移矩阵`所控制。一个`马尔可夫链`中，`迁移矩阵`一旦确定，那么不管它的起始状态（$\mathbf{x}_0$）是什么样，它的`稳态`将唯一确定（有种宿命论的感觉）。这是`马尔可夫链`的一个重要性质，对于一个系统的长期发展很有帮助。此外，这个性质也反应了矩阵的两个重要属性：`特征值`与`特征向量`。

# 二、特征值与特征向量
当我们把一个矩阵看作是一个线性变换：$\mathbf{x} \mapsto \mathbf{A}\mathbf{x}$ 时，我们将矩阵理解成为一种运动，一种能使向量 $\mathbf{x}$ 向着向量 $\mathbf{A}\mathbf{x}$ 移动的「力」。一般来说，向量 $\mathbf{x}$ 经 $\mathbf{A}$ 进行变换有可能是朝着各个方向移动。然而，总有某些特殊向量，线性变换在这些向量上的作用是十分简单的。

比如：已知向量 $\mathbf{u}=\begin{bmatrix}-1\\ 1\end{bmatrix}, \mathbf{v}=\begin{bmatrix}2\\ 1\end{bmatrix}$，矩阵 $\mathbf{A} = \begin{bmatrix} 3 & -2 \\ 1 & 0 \end{bmatrix}$ 表示的线性变换分别应用于（即矩阵左乘）向量 $\mathbf{u}$ 和 $\mathbf{v}$ 后的结果如下图所示：

{% image https://blog.mengqi.life/images/linear-algebra-6/eigenvector.png 线性变换应用于不同的向量 %}

事实上，$\mathbf{A}\mathbf{v} = 2\mathbf{v}$，从图像上看就是拉伸了向量 $\mathbf{v}$。

更一般的，
> $\mathbf{A}$ 为 $n\times n$矩阵，$\mathbf{x}$为非零向量，若存在数 $\lambda$ 使得 $\mathbf{A}\mathbf{x}=\lambda\mathbf{x}$，则称 $\lambda$ 为矩阵 $\mathbf{A}$ 的特征值，$\mathbf{x}$ 为 $\mathbf{A}$ 对应于特征值 $\lambda$ 的特征向量。

这就是我们其实已经很熟悉的`特征值`与`特征向量`定义了。`特征值`与`特征向量`的一个作用就是来研究线性变换中那些「特殊情况」，这些特殊情况可以看作是这个线性变换的「特征」。当我们把矩阵看作线性变换时，`特征值`与`特征向量`可以相配合作为描述这个线性变换的一个「特征」（有的文献也把`特征值`与`特征向量`称为`本征值`与`本征向量`）。

至于`特征值`和`特征向量`的求解，相信大家比较熟练了（建立特征方程 $(\mathbf{A}-\lambda\mathbf{I})\mathbf{x}=\mathbf{0}$ 进行求解），这里不再赘述。注意，一个特征方程所有解的集合构成了一个空间，即对于某一个`特征值`，它所对应的`特征向量`将构成一个空间，被称为 $\mathbf{A}$ 对应于 $\lambda$ 的`特征空间`，`特征空间`由零向量和所有对应于 $\lambda$ 的`特征向量`组成。

不同`特征值`对应的`特征向量`线性无关，而同一个`特征值`对应的不同`特征向量`能张成整个`特征空间`。如果一个`特征值`只对应一个`特征向量`，那么这个`特征值`对应的`特征空间`就是一条一维直线；而如果一个`特征值`对应两个`特征向量`，那么这个`特征值`对应的`特征空间`将是一个二维平面。

{% image https://blog.mengqi.life/images/linear-algebra-6/eigenspace.png 两个一维特征向量张成两个一维特征空间 %}

由于 $\mathbf{A}\mathbf{x}=\lambda\mathbf{x}$，因而线性变换 $\mathbf{A}$ 对于`特征空间`只起到「扩张」的作用（扩张后还是同样的`特征空间`）。

{% image https://blog.mengqi.life/images/linear-algebra-6/span.png 特征空间的扩张 %}

# 三、特征向量与马尔可夫链

我们已经知道 $\mathbf{x}_{i+1}=\mathbf{A}\mathbf{x}_k$，而如果我们找一个 $\mathbf{A}$ 的`特征值` $\lambda$ 及其对应的`特征向量` $\mathbf{x}_0$，则有
$$
\mathbf{x}_1 = \mathbf{A}\mathbf{x}_0 = \lambda\mathbf{x}_0 \\
\mathbf{x}_{i+1} = \mathbf{A}\mathbf{x}_i = \lambda\mathbf{x}_i = \lambda^i\mathbf{x}_0
$$

因此，如果我们已经知道一个马尔可夫链的转移矩阵 $\mathbf{A}$，我们不需要看它的初始状态是什么，只要找 $\mathbf{A}$ 的`特征值` $\lambda$ 及其对应的`特征向量` $\mathbf{x}_0$，那么我们就能通过计算得到这个马尔可夫链达到稳态时的状态。

$\mathbf{x}_0$ 除了用一个`特征向量`外，也可以用多个`特征向量`的线性组合。比如 $\mathbf{A}$ 的`特征值`为 $\lambda_1, \lambda_2$，对应的两个`特征向量`为 $\mathbf{v}_1, \mathbf{v}_2$，那么我们可以用 $c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2$ 来表示 $\mathbf{x}_0$。这样得到的 $\mathbf{x}_{i+1}$ 为：

$$
\begin{aligned}
\mathbf{x}_1 &= \mathbf{A}\mathbf{x}_0 \\
&= c_1 \mathbf{A} \mathbf{v}_1 + c_2 \mathbf{A} \mathbf{v}_2 \\
\mathbf{x}_{i+1} &= c_1 \mathbf{A}^i \mathbf{v}_1 + c_2 \mathbf{A}^i \mathbf{v}_2 \\
&= c_1 \lambda_1^i \mathbf{v}_1 + c_2 \lambda_2^i \mathbf{v}_2
\end{aligned}
$$

## 3.1 人口迁移例子

回顾 {% post_link linear-algebra-5 上一章 %} 那个关于城市人口迁移的研究，那个例子我们引入了`马尔可夫链`这个概念，而从这章我们知道`马尔可夫链`有个`平稳分布`的性质，那么{% post_link linear-algebra-5 上一章 %}那个人口迁移的例子最终也一定会达到某种稳定状态，即城乡人口比例保持不变。

{% post_link linear-algebra-5 上一章 %}中，我们已经得出：
$$
\mathbf{x}_0 = 
\mathbf{x}_{i+1} = \begin{bmatrix} c_{i+1} \\ r_{i+1} \end{bmatrix}
= \begin{bmatrix} 0.95 & 0.03 \\ 0.05 & 0.97 \end{bmatrix}\begin{bmatrix} c_i \\ r_i \end{bmatrix}
$$

即`迁移矩阵` $\mathbf{A} = \begin{bmatrix} 0.95 & 0.03\\ 0.05 & 0.97 \end{bmatrix}$。这次的套路是求解特征方程 $(\mathbf{A}-\lambda\mathbf{I})\mathbf{x}=0$（事实上，这里的2阶方阵通过计算行列式解 $\det\mathbf{A}=0$ 会更方便些。当然，手边有电脑的话直接交给 matlab、python 之类的就行 :D），得到特征值为 1 和 0.92，对应的特征向量分别为 $\mathbf{v}_1 = \begin{bmatrix} 3\\ 5 \end{bmatrix}$ 和 $\mathbf{v}_2 = \begin{bmatrix} 1\\ -1 \end{bmatrix}$ 的倍数。

由于有两个互不相等的特征值，我们可以知道它们对应的两个特征向量也线性无关，我们将初始向量 $\mathbf{x}_0$ 用两个特征向量的线性组合表示：

$$
\mathbf{x}_0 = c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2
= [\mathbf{v}_1 \mathbf{v}_2] \begin{bmatrix} c_1\\ c_2 \end{bmatrix}
$$

假设我们已知 $\mathbf{x}_0 = \begin{bmatrix} 0.6\\ 0.4 \end{bmatrix}$ （单位：百万人），那么就可以解得 $c_1 = 0.125, c_2 = 0.225$.

所以，每年的人口分布为：
$$
\begin{array}{rl}
\mathbf{x}_{i+1} = \mathbf{A}\mathbf{x}_i = \mathbf{A}^i\mathbf{x}_0 
&= c_1 \mathbf{A}^i \mathbf{v}_1 + c_2 \mathbf{A}^i \mathbf{v}_2 \\
&= c_1 \, 1^i \, \mathbf{v}_1 + c_2 \, 0.92^i \, \mathbf{v}_2
\end{array}
$$

随着 $i \rightarrow \infty$，$1^i = 1, 0.92^i \rightarrow 0$，所以 $x_i \rightarrow c_1 \mathbf{v}_1 = 0.125 \mathbf{v}_1$

这就显示了这个马尔可夫链最终总会达到`平稳分布`，达到`平稳分布`时的`稳态向量`就是 $0.125 \mathbf{v}_1$。这也印证了我们之前的观察：马尔可夫链达到`平稳分布`时，`稳态向量`与初始状态无关，只与`迁移矩阵`（特别是`迁移矩阵`的`特征向量`）有关。

# 总结
这一章，我们通过`马尔可夫链`了解到了矩阵`特征值`与`特征向量`的概念。在本章中，我们把一个矩阵看作是一个线性变换，这个矩阵不断应用于某一个向量，使这个向量在空间中发生「运动」。而直观的讲，`特征值`与`特征向量`就是来描述这个「运动」的一个「本征」的，即在某些方向上的线性变换不会改变向量的方向。

# 参考文献
---
- 线性代数及其应用：第3版/（美）莱（Lay, D.C.）著；沈复兴等译. ——北京：人民邮电出版社，2007.7

# 版权声明：
---
本文中所有文字、图片版权均属本人所有，如需转载请注明来源。
