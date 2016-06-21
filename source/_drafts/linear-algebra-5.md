---
title: 线性代数拾遗（五）：矩阵变换的应用
tags:
  - 线性代数拾遗
  - 线性代数
  - 数学
  - 基础概念
categories: 线性代数
---

{% asset_img banner.jpeg %}

{% post_link linear-algebra-2 上一章 %}用了一个经济学的例子，介绍了现实中的线性方程组，那个例子里，我们借助矩阵“封装”的作用，将解三个方程组的问题转换为解{% math %}$\mathbf{A}\mathbf{x}=\mathbf{0}${% endmath %}。而我们知道，矩阵不仅可以封装数据，还可以表示线性变换，那这一章就来介绍一下矩阵变换在现实生活中的应用。

<!-- more -->

# 一、社会学例子
这个例子同样来自于《线性代数及其应用》这本书。

假如我们要研究一个城市的人口迁入、迁出的问题。用 $r_i$ 和 $s_i$ 分别表示第 $i$ 年该城市市区和郊区的人口数，$r_0$和$s_0$就是初始年（最开始进行观测的那一年）市区和郊区的人口数。再用 $\mathbf{x}_i$ 表示第 $i$ 年的人口向量：{% math %} x_i = \begin{bmatrix}r_i \\ s_i \end{bmatrix} {% endmath %}。

设人口统计学研究表明，每年有 5% 的城市人口迁移到郊区（其余 95% 继续留在城市），有 3% 的郊区人口移居城市（其余 97% 继续留在郊区）。

{% plantuml %}
{% endplantuml %}

这个研究结果，用数学表示就是，第 $i$ 年的城区人口经过一年后，在城区和郊区的分布为：

{% math %}
\begin{equation}
\begin{bmatrix} 0.95 \mathbf{r}_{i} \\ 0.05 \mathbf{r}_{i} \end{bmatrix}
\end{equation}
{% endmath %}

第 $i$ 年的郊区人口经过一年后，在城区和郊区的分布为：

{% math %}
\begin{equation}
\begin{bmatrix} 0.03 \mathbf{s}_{i} \\ 0.97 \mathbf{s}_{i} \end{bmatrix}
\end{equation}
{% endmath %}

这时（第 $i+1$ 年），城区人口有来自一年前城区人口的 95%，以及一年前郊区人口的 3%；同样，郊区人口有来自一年前城区人口的 5%，以及一年前郊区人口的 97%。用向量表示就是，第 $i+1$ 年的城市人口分布：

{% math %}
\begin{equation}
\mathbf{x}_{i+1} = \begin{bmatrix} r_{i+1} \\ s_{i+1} \end{bmatrix}
= r_0 \begin{bmatrix} 0.95 \\ 0.05 \end{bmatrix} + s_0 \begin{bmatrix} 0.95 \\ 0.05 \end{bmatrix}
= \begin{bmatrix} 0.95 & 0.03 \\ 0.05 & 0.97 \end{bmatrix}\begin{bmatrix} r_i \\ s_i \end{bmatrix}
\end{equation}
{% endmath %}

也就是每年人口分布是由上一年人口分布左乘一个矩阵（这个矩阵表示线性变换）得到的，我们用 $\mathbf{M}$ 表示这个矩阵，就是：

{% math %}
\begin{equation}
\mathbf{x}_{i+1} = \mathbf{M} \mathbf{x}_i
\end{equation}
{% endmath %}

从这个例子，我们可以发现，当我们假设人口迁移的规律比较简单时（每一年的人口只于上一年人口有关，且是线性关系），人口的迁移就可以通过线性变换来表示。又由于矩阵可以表示一个线性变换，所以每一年的人口都可看作是上一年人口左乘一个变换矩阵（又叫`转移矩阵`）。

有同学可能已经意识到了，这个例子实际上就是`马尔可夫链`嘛！对，这个就是马尔可夫链：每一年人口只于上一年人口有关。未来关于这个例子也会进一步展开，目前知道`转移矩阵`这个概念就可以了。

# 参考文献
---
- 线性代数及其应用：第3版/（美）莱（Lay, D.C.）著；沈复兴等译. ——北京：人民邮电出版社，2007.7

# 版权声明：
---
本文中所有文字、图片版权均属本人所有，如需转载请注明来源。
