title: 线性代数拾遗（三）：线性变换以及矩阵的意义
tags:
  - 数学
  - 线性代数拾遗
  - 线性代数
  - 基础概念
category: 线性代数
mathjax: true
date: 2016-05-20 21:11:00
---


{% post_link linear-algebra-2 上一章 %}我们讨论了齐次和非齐次两种线性方程组的解集，以及它们的几何意义。由齐次线性方程组，我们引入了零空间的概念；而由非齐次线性方程组，我们引入了列空间的概念。这两个空间目前是我们理解线性方程组的桥梁，未来还会对这些空间进行更进一步的讨论。在这之前，让我们先来研究一下矩阵的意义。 

之前的两章中，矩阵是在矩阵方程中出现的，当时我们理解它的意义为“对向量的一种封装”，也就是一种“数据”的形式理解矩阵的。这一章，我们引入矩阵的另一层意义：`线性变换`。

<!-- more -->

# 变换 
假如有如 $\mathbf{A}\mathbf{x}=\mathbf{b}$ 形式的方程：
{% math %}
\begin{bmatrix}
4 & -3 & 1 & 3 \\
2 & 0 & 5 & 1
\end{bmatrix}
\begin{bmatrix} 1 \\ 1 \\ 1 \\ 1 \end{bmatrix}
=
\begin{bmatrix} 5 \\ 8 \end{bmatrix}
{% endmath %} 
以往我们都是将其看成是几个列向量的线性组合，即{% math %}1\begin{bmatrix}4 \\ 2\end{bmatrix} + 1\begin{bmatrix}-3 \\ 0\end{bmatrix} + 1\begin{bmatrix}1 \\ 5\end{bmatrix} + 1\begin{bmatrix}3 \\ 1\end{bmatrix} = \begin{bmatrix} 5 \\ 8 \end{bmatrix}{% endmath %}，这次我们换个角度，把 $\mathbf{A}$ 看作一个整体，整个方程就是一个 4 维向量 $\mathbf{x}$ 乘以矩阵 $\mathbf{A}$ 后得到一个 2 维向量 $\mathbf{b}$。 以这个观点来看的话，**矩阵 $\mathbf{A}$ 就相当于一个从一个向量集映射到另一个向量集的函数！**。

假设 $\mathbf{x}$ 是 $n$ 维向量，$\mathbf{b}$ 是 $m$ 维向量，则 $\mathbf{A}$ 就是一个 $R^n$ 到 $R^m$ 的变换。这个变换的`定义域`是 $R^n$，`上域`是 $R^m$，记作 $T: R^n \rightarrow R^m$。$\mathbf{x}$ 是 $R^n$ 空间中的一个向量，$T(\mathbf{x})$ 就是其变换到 $R^m$ 空间中的`像`，而全体像 $T(\mathbf{x})$ 的集合就称为变换 $T$ 的`值域`。图示如下：

{% asset_img linear-transformation.png 变换$T$ %}

从这种观点来看，矩阵就是一个函数：$\mathbf{x}\mapsto\mathbf{A}{x}$！矩阵既可看作是数据的表示，又可看作是表示变换的函数，这不禁让我联想起了 lisp 里的“同像性”，也就是“代码即数据”。我不知道他们之间有没有更深一层的联系，不过从这一层面再来看矩阵，感觉又多了一层趣味……

除此之外，以动态的眼光来看待矩阵，也有助于我们理解为什么一些随时间变化的系统可以用线性代数来建模。比如马尔科夫链中的转移矩阵，就是用静态的矩阵来表示一个变换的过程。

不难发现，当变换 $T$ 为 $\mathbf{x}\mapsto\mathbf{A}\mathbf{x}$ ，向量 $\mathbf{x}$ 若有 n 维，则变换的定义域就是 $R^n$，$\mathbf{A}$ 就有 n 列；向量 $\mathbf{b}$  若有 m 维，则变换的上域就是 $R^m$，$\mathbf{A}$ 就有 m 行（$\mathbf{A}$ 每一列有 m 个元素）。而变换的值域就是 $\mathbf{A}$ 中列的所有线性组合组成的集合。

也就是说，像 {% math %}\begin{bmatrix}1 & -3 \\ 3 & 5 \\ -1 & 7\end{bmatrix}{% endmath %}这样的矩阵，所表达的变换就是一个二维到三维的映射 $T:R^2\rightarrow R^3$。

再例如，矩阵{% math %}\begin{bmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0\end{bmatrix}{% endmath %} 所表达的变换就是一个投影：把 $R^3$ 中的点投影到 $x_1 x_2$平面，因为：
{% math %}
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 0
\end{bmatrix}
\begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix}
=
\begin{bmatrix} x_1 \\ x_2 \\ 0 \end{bmatrix}
{% endmath %} 

# 线性变换
线性变换是一类满足线性条件的变换。所谓的线性条件就是：
$$T(\mathbf{u}+\mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v}) \\ \text{和}\\ T(c \mathbf{u}) = c T(\mathbf{u})$$
 
注意到，向量的加法和数乘运算在变换前和变换后的效果是一样的，也就是所谓的线性变换*保持了*向量的加法和数乘运算。

我们假设有一个二维向量 $\mathbf{x}=\begin{bmatrix}x_1\\ x_2 \end{bmatrix}= x_1 \mathbf{e}_1 + x_2 \mathbf{e}_2$，其中 {% math %}\mathbf{e}_1=\begin{bmatrix}1\\ 0\end{bmatrix}, \mathbf{e}_2=\begin{bmatrix}0\\ 1\end{bmatrix}{% endmath %} 是 2$\times$ 2 单位矩阵 $\mathbf{I}_n$ 的列向量。由于线性变换保持加法和数乘运算，所以

{% math %}
\begin{equation*}
T(\mathbf{x})=x_1 T(\mathbf{e}_1) + x_2 T(\mathbf{e}_2) = \begin{bmatrix}T(\mathbf{e}_1) & T(\mathbf{e}_2)\end{bmatrix} \begin{bmatrix} x_1\\ x_2 \end{bmatrix} = \mathbf{A}\mathbf{x}
\end{equation}
{% endmath %}

这也就是说，对于每一个线性变换$T: R^n \rightarrow R^m$，都有唯一一个矩阵 $\mathbf{A}$，使得 $T(\mathbf{x})=\mathbf{A}\mathbf{x}$，其中 $ \mathbf{A} = [ T(\mathbf{e}_1) \cdots T(\mathbf{e}_1) ] $。$ \mathbf{A} $ 被称为是线性变换 $T$ 的`标准矩阵`。

总结一下，线性变换是满足线性条件的变换，所谓线性条件就要求变换前后的加法和数乘运算不变（变换前 a+b 等于 c，则变换后 a'+b' 也等于 c'）。 线性变换有两种描述形式：$T:R^n \rightarrow R^m$ 和 $ \mathbf{x} \mapsto \mathbf{A}\mathbf{x} $，后者也被称为`矩阵变换`

> 线性变换强调它作为映射的性质，而矩阵变换则描述了映射是怎样实现的。

# 几何中的线性变换
借助上面线性变换的性质，我们就很容易理解图形学中一些专门用于变换的矩阵了，比如 2 维平面上的旋转矩阵：
{% math %}
\begin{equation*}
\mathbf{A}=
\begin{bmatrix}
\cos\varphi & -\sin\varphi \\
\sin\varphi & \cos\varphi
\end{bmatrix}
\end{equation}
{% endmath %}

把它的列向量拆开，就是 {% math %}T(\mathbf{e}_1) = \begin{bmatrix}\cos\varphi \\ \sin\varphi \end{bmatrix}{% endmath %}，{% math %}T(\mathbf{e}_2) = \begin{bmatrix}-\sin\varphi \\ \cos\varphi \end{bmatrix}{% endmath %}也就是 {% math %}\begin{bmatrix}1\\ 0\end{bmatrix}{% endmath %} 旋转到 {% math %}\begin{bmatrix}\cos\varphi \\ \sin\varphi\end{bmatrix}{% endmath %} ，{% math %}\begin{bmatrix}0\\ 1\end{bmatrix}{% endmath %} 旋转到 {% math %}\begin{bmatrix}-\sin\varphi \\ \cos\varphi\end{bmatrix}{% endmath %} 。

旋转变换如下图所示：
 
{% asset_img rotation.png 旋转变换 %}

# 存在性和唯一性问题
有了线性变换的概念，我们再来回顾之前两章讨论的解的存在性和唯一性的问题。

## 解的存在性

非线性方程组 $\mathbf{A}\mathbf{x}=\mathbf{b}$ 可以看做是一个 $ \mathbf{x} $ 所在空间到 $ \mathbf{b} $ 所在空间的映射。
对映射 $T=R^n\rightarrow R^m$ ，如果 $R^n$ 中任意向量 $\mathbf{b}$ 都是 $R^n$ 中至少一个 $\mathbf{x}$ 的像，则称 $T$ 是 $R^n$ 到 $R^m$ 上的映射（或叫`满射`），这时，非线性方程组对于任意的 $ \mathbf{b} $ 都有解。反过来，如果存在 $ \mathbf{b} $ 使得非线性方程组无解，那么 $T$ 就不是 $R^n$ 到 $R^m$ 上的满射。它们的几何表示如下图所示：

{% asset_img existence.png 满射 %}
 
## 解的唯一性
如果任意的 $ \mathbf{b}\in R^m $ 都是 $R^n$ 中最多一个向量 $ \mathbf{x} $ 的像，那么就称 $T$ 是`一对一映射`。

一对一映射也就是非线性方程组 $\mathbf{A}\mathbf{x}=\mathbf{b}$ 对任意 $ \mathbf{b} $ 要么无解，要么有唯一解。也就是说，当 方程 $\mathbf{A}\mathbf{x}=\mathbf{b}$ 有无穷多解时（即方程含有自由变量，即不满秩，即各列线性相关） ，$T$ 就不是一对一映射，这时齐次方程组 $\mathbf{A}\mathbf{x}=\mathbf{0}$ 只有平凡解。

{% asset_img uniqueness.png 一对一映射 %}
 
参考文献:
---
- 线性代数及其应用：第3版/（美）莱（Lay, D.C.）著；沈复兴等译. ——北京：人民邮电出版社，2007.7

版权声明：
---
本文中所有文字、图片版权均属本人所有，如需转载请注明来源。
