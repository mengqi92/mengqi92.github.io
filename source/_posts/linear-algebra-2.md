---
title: 线性代数拾遗（二）：线性方程组的解集及其几何意义
tags:
 - 数学
 - 线性代数
 - 线性代数拾遗
 - 基础概念
category: 线性代数
mathjax: true
date: 2016-05-14
---

{% image https://mengqistatic.azureedge.net/staticfiles/linear-algebra-2/banner.jpeg %}

{% post_link linear-algebra-1 上一章 %}我们讲到三种等价形式：线性方程组、向量方程和矩阵方程。由于这三者之间的等价关系，我们解决现实问题时可以自由选取其中任意一个作为模型。我个人认为，线性方程组是最「质朴」的形式；向量方程则是与几何建立了关系，这将方便我们进行更直观的推理；矩阵方程则是向量方程的一种「封装」，是向量方程的一种抽象，它将具体的向量形式隐藏，提供给我们一个简洁的 API 形式——矩阵。未来将要介绍的很多概念就是基于对这一层封装的研究，如果到时候我们发现某个概念理解有困难，不妨转换思路到向量方程或线性方程组的形式进行分析。

此外，我们之前还进行了关于线性方程组解集的讨论，在这章我们对其进一步探讨。

<!-- more -->

# 一、齐次线性方程组
形如 $\mathbf{A}\mathbf{x}=\mathbf{0}$ 的线性方程组称为`齐次方程组`。显然，$\mathbf{x}=\mathbf{0}$ 是方程的解，这个解太平凡了，以致于就叫`平凡解`。我们平常更关心的是它还有没有别的解，即`非平凡解`。下面以一个例子分析一下：

例：判断下列齐次方程组是否有非平凡解，表示其解集。
$$
\begin{array}
3x_1 &+& 5x_2 &-& 4x_3 &= 0 \\
-3x_1 &-& 2x_2 &+& 4x_3 &= 0 \\
6x_1 &+& x_2 &-& 8x_3 &= 0
\end{array}
$$

对于这类求解集的问题，我们可以直接对增广矩阵化简，得到
$$
\begin{equation*}
[\mathbf{A}\ \mathbf{0}] \sim
\begin{bmatrix}
3 & 5 & -4 & 0 \\
-3 & -2 & 4 & 0 \\
6 & 1 & -8 & 0
\end{bmatrix}
\sim
\begin{bmatrix}
3 & 5 & -4 & 0 \\
0 & 3 & 0 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 0 & -\frac{4}{3} & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix}
\end{equation*}
$$

从最后的行最简形式，我们可以得到解：$$x_1 = \frac{4}{3} x_3, x_2 =0$$，其中 $x_3$ 是自由变量。所以 $\mathbf{x}$ 的通解就是 $$\mathbf{x} = \begin{bmatrix}x_1\\ x_2\\ x_3\end{bmatrix} = x_3\begin{bmatrix}\frac{4}{3}\\ 0\\ 1\end{bmatrix} = x_3\mathbf{v}$$。也就是说，$\mathbf{A}\mathbf{x}=\mathbf{0}$ 的解是三维空间（因为向量 $\mathbf{v}$ 是三维的）中的一条直线（因为只有一个自由变量）。进一步推广，我们不难想象，如果解集中有 $p$ 个自由变量，则解集就是 $m$ 维空间（$m$ 为 $\mathbf{A}$ 的行数）中，$p$ 个向量张成的空间。**如果没有自由变量（也就是 $\mathbf{A}$ 各列线性无关），那么就有 0 个向量张成的空间，即 $\operatorname{Span}\{\mathbf{0}\}$，$\mathbf{A}\mathbf{x}=\mathbf{0}$ 也就只有平凡解。**

# 二、非齐次线性方程组
`非齐次线性方程组`形如 $\mathbf{A}\mathbf{x}=\mathbf{b}$，
为了方便对比，我们把上面那个例子改为一个非齐次方程组进行分析：
$$
\begin{array}
3x_1 &+& 5x_2 &-& 4x_3 &=& 7 \\
-3x_1 &-& 2x_2 &+& 4x_3 &=& -1 \\ 
6x_1 &+& x_2 &-& 8x_3 &=& -4 
\end{array}
$$

老套路，我们对这个方程组的增广矩阵行化简：
$$
\begin{bmatrix}
3 & 5 & -4 & 7 \\
-3 & -2 & 4 & -1 \\
6 & 1 & -8 & -4
\end{bmatrix}
\sim
\begin{bmatrix}
3 & 5 & -4 & 7 \\
0 & 1 & 0 & 2 \\
0 & 0 & 0 & 0
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 0 & -\frac{4}{3} & -1 \\0 & 1 & 0 & 2 \\
0 & 0 & 0 & 0
\end{bmatrix}
$$

化简后可以得到方程组的解为：$$x_1 = -1 + \frac{4}{3}x_3，x_2 = 2$$，其中 $x_3$ 是自由变量。
我们把这个解集用向量的形式表示出来就是：
$$
\begin{equation*}
\mathbf{x} = \begin{bmatrix}x_1\\ x_2\\ x_3\end{bmatrix}
= \begin{bmatrix}-1+\frac{4}{3}x_3\\ 2\\ x_3\end{bmatrix}
= \begin{bmatrix}-1\\ 2\\ 0\end{bmatrix} + x_3 \begin{bmatrix}\frac{4}{3}\\ 0\\ 1\end{bmatrix}
\end{equation*}
$$
注意到这个向量可分解为一个常数向量$$\begin{bmatrix}-1\\ 2\\ 0\end{bmatrix}$$和一个可任意伸缩的向量$$x_3\begin{bmatrix}\frac{4}{3}\\ 0\\ 1\end{bmatrix}$$，而且，常数向量就是行化简后矩阵的最后一列，而 $$\begin{bmatrix}\frac{4}{3}\\ 0\\ 1\end{bmatrix}$$ 同样是齐次方程组的解。这是因为非齐次方程组只是最后一列由$\mathbf{0}$换成了$\mathbf{b}$，而且最后一列不会影响前面三列，所以齐次和非齐次方程组行化简后，变量的对应系数是相同的（系数矩阵就是前三列），**非齐次方程组的解仅仅只比齐次方程组的解多了一个常数向量**。例如齐次方程组的解集为$\mathbf{x}=t\mathbf{v}$，则非齐次方程组的解集就是 $\mathbf{x}=\mathbf{p}+t\mathbf{v}$，其中 $t$ 为任意实数。从几何的角度来看，就是**齐次方程组的解集经向量 $\mathbf{p}$ 平移得到非齐次方程组的解集**。这个 $\mathbf{p}$ 的学名就叫做`特解`。

注意，这里讲齐次方程组和非齐次方程组的解有一个前提，就是非齐次方程组首先要是有解的，如果$\mathbf{0}$变成$\mathbf{b}$ 导致方程组没有解，那么也就不能用齐次方程组的解集平移了。

结合之前总结的齐次线性方程组解的性质，当方程组含有 $p$ 个自由变量时，齐次方程组的解集是 $p$ 个向量的张成空间，而非齐次方程组解集只是这个空间进行了平移（前提是非齐次方程组有解），并没有改变这个空间的基本性质（比如空间的维度）。

# 三、列空间
矩阵$$ \mathbf{A} = [\mathbf{a_1} \mathbf{a_2} \cdots \mathbf{a_n}] $$的各个列向量线性组合组成的集合，就是$\mathbf{A}$的列空间。记作 $\operatorname{Col}\mathbf{A}$，即
$$
\begin{equation*}
\operatorname{Col} \mathbf{A} = \operatorname{Span}\{\mathbf{a_1}, \mathbf{a_2}, \cdots, \mathbf{a_n}\}
\end{equation*}
$$

这个列空间，我们应该不陌生了，上一章中很多时候都是把矩阵看成列向量的排列，考虑 $\mathbf{A}\mathbf{x}=\mathbf{b}$ 的解的情况时其实就是在列向量中进行分析的。列空间在分析矩阵中各列向量的线性相关性时很有帮助：只有各列线性无关时，这 $n$ 个列才能张成 $n$ 维空间，这时就说这个矩阵的秩为 $n$；而假如这里面有 1 列和其他某列线性相关，那么这 $n$ 个列就只能张成 $n-1$ 维空间，这个矩阵的秩就是 $n-1$；也就是说，**矩阵的秩说明了这个矩阵的列向量最多能张成多少维**。

如下图中，$\mathbf{A} = [\mathbf{a_1}\ \mathbf{a_2}\ \mathbf{a_3}]$，由于有两个向量线性相关，导致 3 个列向量只能张成 2 维，因此 $\mathbf{A}$ 的秩为 2。所以 $\mathbf{A}\mathbf{x}$ 得不到任意三维向量 $\mathbf{b}$，也就是 $\mathbf{A}\mathbf{x}=\mathbf{b}$ 并不对所有 $\mathbf{b}$ 成立（只有$\mathbf{b}$ 是 $\mathbf{A}$ 列空间中的向量时才成立）。

{% image https://mengqistatic.azureedge.net/staticfiles/linear-algebra-2/r_less_than_n.png 秩小于n的情况 %}

更进一步，非齐次线性方程组 $\mathbf{A}\mathbf{x}=\mathbf{b}$ 中，如果 $\mathbf{A}$已知，$\mathbf{x}$和$\mathbf{b}$ 未知，此时我们关注的问题是 $\mathbf{A}$ 的列向量能张成多少维；如果 $\mathbf{A}$ 和 $\mathbf{b}$ 已知，我们关注的问题就是 $\mathbf{A}$ 中 $n$ 个列向量如何线性表示能表示成 $\mathbf{b}$，这时候我们如果提前知道 $\mathbf{A}$ 的列空间达不到 $\mathbf{b}$ 的维数，那么这些列向量就一定无法线性组合出 $\mathbf{b}$。

# 四、零空间
齐次方程 $\mathbf{A}\mathbf{x}=\mathbf{0}$ 的全部解组成的集合，称为矩阵 $\mathbf{A}$ 的零空间，记作 $\operatorname{Nul} \mathbf{A}$。

当 $\mathbf{A}$ 中的列向量线性无关时，$\mathbf{A}\mathbf{x}=\mathbf{0}$ 只有零解，这时 $\mathbf{A}$ 的零空间就是 $\mathbf{0}$；而只要 $\mathbf{A}$ 中的列向量线性相关，$\mathbf{A}\mathbf{x}=\mathbf{0}$ 就存在非零解，这时 $\mathbf{A}$ 的零空间就是一个维度大于 0 的空间。

关于列空间和零空间的讨论先在这里打住，之后会进一步讨论它们之间的关系和各自的意义。目前只要知道列空间是由 $\mathbf{A}$ 的列向量张成的，而零空间的意义更隐晦一些，是 $\mathbf{A}\mathbf{x}=\mathbf{0}$ 的所有解组成的空间。从列空间能看出 $\mathbf{A}$ 各列的线性相关关系，列向量越相关，列空间维度越低。从零空间也能看出 $\mathbf{A}$ 各列的线性相关性，列向量越相关，零空间维度越高。而负责量化描述 $\mathbf{A}$ 列向量有多么线性相关的，是一个叫做`秩`的东西。

# 参考资料：
---
- 线性代数及其应用：第3版/（美）莱（Lay, D.C.）著；沈复兴等译. ——北京：人民邮电出版社，2007.7
- 麻省理工学院的[线性代数公开课](http://open.163.com/special/opencourse/daishu.html)

# 版权声明：
---
本文中所有文字、图片版权均属本人所有，如需转载请注明来源。
