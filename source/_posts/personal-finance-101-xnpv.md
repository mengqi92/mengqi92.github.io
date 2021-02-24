---
title: 个人财务 101 - NPV 的实现与改进
tags:
  - 个人财务
  - 投资
  - Excel
category: 个人财务
mathjax: true
date: 2021-02-23 22:27:19
---

{% image https://mengqistatic.azureedge.net/staticfiles/personal-finance-101-xnpv/banner.jpg %}

在{% post_link personal-finance-101-rate-of-return 上一篇文章 %}，我们介绍了净现值 NPV，用来表示未来现金流在当前时刻的折现值。它的公式是：

$$NPV=\sum^n_{t=1}\frac{R_t}{(1+i)^t}$$

其中，t 为期数，i 为折现率。

NPV 是一个很方便的值，利用它，我们可以排除通货膨胀率（或者备选投资回报率）的干扰，将跨越时间的投资现金流投影到此时此刻，是真正收益还是亏损，看得清清楚楚。此外，NPV 的计算也能帮助我们理解内部回报率（IRR）的计算。这一篇，我们就尝试一下通过代码计算 NPV。

<!-- more -->

## 代码实现
根据公式，我们可以用这样的 Python 代码来计算 NPV：

```python
def npv(cashflows: List[float], rate: float) -> float:
    n = len(cashflows)
    ts = range(1, n+1)
    return sum([(cashflow / (1+rate) ** t) for t, cashflow in zip(ts, cashflows)])
```

比如我们上一篇介绍的那个购买设备的例子：

> 买入一台价值 ￥1,000,000 的设备，这台设备能用 5 年，这 5 年中每个月能创造 ￥25,000 的收入。与此同时，这 ￥1,000,000 也可以选择投入到一个预期年化 8% 的股票市场里。假如作为公司经理，你改如何选择？


用这个 Python 函数计算就是：
```python
>>> cashflows = [25_000 for _ in range(60)]
>>> # 预期年化 8% 换算成每期（月）收益率为 0.64%
>>> rate = 0.0064
>>> npv(cashflows, rate)
1242322.8221563739
```
这段代码跑出来的结果是未来 60 期现金流的折现值，再加上期初的投入 -￥1,000,000 正是 ￥242,322.82，和我们上一期计算的一致。

我们也可以在 Excel 里进行验算：将每期收益 ￥25,000 填入表格，这里为了方便截图，我填入了五列数据，每列 12 行，代表五年中每个月的收益。在最后一个单元格后通过公式 `NPV(0.0064, $A1:$A12, $B1:$B12, $C1:$C12, $D1:$D12, $E1:$E12)` 计算 NPV 值。

{% image https://mengqistatic.azureedge.net/staticfiles/personal-finance-101-xnpv/Excel-NPV.png Excel NPV 计算 %}


可以发现，Excel 给出的值是 ¥1,242,322.82，减去投资成本 ￥1,000,000 正好就是我们算出来的 ￥242,322.82！

> 这里需要我们手动减去成本是因为 Excel 计算 NPV 时填入的参数只能是各个定期收益（即每月收益），只是实现细节问题，不影响计算的准确性。

## 存在的问题

无论是 Python 还是 Excel，我们的 NPV 实现都隐含了一个假设，那就是每一期的时间段是固定的，这个场景在我们平时生活也比较常见，比如我们每月定投基金，或者每月换信用卡，都可以用这种固定时间间隔的现金流来建立模型。但是，我们日常生活中，更大概率是在处理不定长时间的现金流，比如买卖股票、购置大件商品等等，这些交易在时间上都是比较随机地发生的——即使我们选择定投买入股票，卖出的时间通常也不是提前就计划好的。有时甚至还可能听到风声，头脑一热，任意地加仓减仓 :)。

那么，对于这种不定长时间的投资现金流，我们该如何计算它的 NPV 呢？

## 不定长时间段 NPV 的计算
其实，对于不定长时间段的现金流，我们假如取更细粒度的时间段作为每期时长（比如每期一天或者一小时），那么这个现金流就又变成了定长时间段。因此这种情况下 NPV 的计算同样可以直接套用之前的公式，只不过我们需要预先对时间段做一些处理。

举个例子，比如小明
* 在 2021 年元旦以 ￥100 价格买入了 10 股股票 A；
* 在春节前夕（2月1日）以 ￥110 的单价卖出其中 5 股（共得现金 ￥600，不考虑手续费佣金）回家过年；
* 之后又在元宵节（2月26日）以 ￥120 的价格清仓（共得现金 ￥600，不考虑手续费佣金）。

那么小明的这段投资现金流可以表示为：

|    时间   | 现金流|
|----------|------|
|2021-01-01| -1000|
|2021-02-01|   550|
|2021-02-26|   600|

我们以每一天作为一期，那么
* 元旦那天是第 0 期；
* 2月1日就是第 31 期；
* 2月26日就是第 31 + (26 - 1) = 56 期。

|    时间   |期数| 现金流|
|----------|----|------|
|2021-01-01|  0 | -1000|
|2021-02-01| 31 |   550|
|2021-02-26| 56 |   600|

当然我们大可不必自己手算期数，直接利用 Python 中的 `datetime` 即可：

```python
>>> (datetime.date(2021, 2, 1) - datetime.date(2021, 1, 1)).days
31
```

### 不定长时间段 NPV 的实现
我们回顾一下我们之前的 `npv` 函数实现：

```python
def npv(cashflows: List[float], rate: float) -> float:
    n = len(cashflows)
    ts = range(1, n+1)
    return sum([(cashflow / (1+rate) ** t) for t, cashflow in zip(ts, cashflows)])
```

对于不定长时间的场景，其实就是上面函数里生成的 `ts` 序列不同罢了。不定长时间段需要由调用方传入，我们再将其以每日一期转换为固定时间段的期数。假设我们接受的 `ts` 序列每个元素都是一个 datetime 类型，那么改写后的 `xnpv` 的实现就是这样的：

```python
def xnpv(dates: List[datetime.datetime], cashflows: List[float], rate: float) -> float:
    n = len(cashflows)
    first_date = dates[0]  # 取第一期的时间，以便计算时间差来得到期数
    ts = [(date - first_date).days for date in dates]
    return sum([(cashflow / (1+rate) ** t) for t, cashflow in zip(ts, cashflows)])
```

为了方便计算，我们可以规定传入的 `rate` 为年化收益率，再在函数内部将其转换为每期（即每天）的收益率：

$$\text{每期收益率} = (1+\text{年化收益率})^{\frac{1}{365}} - 1$$

代入到 NPV 公式中，就是：

$$NPV=\sum^n_{t=1}\frac{R_t}{(1+i)^\frac{t}{365}}$$

其中 i 为年化收益率。

我们根据这个公式调整下我们的代码，得到：
```python
def xnpv(dates: List[datetime.datetime], cashflows: List[float], rate: float) -> float:
    n = len(cashflows)
    first_date = dates[0]  # 取第一期的时间，以便计算时间差来得到期数
    ts = [(date - first_date).days for date in dates]
    return sum([(cashflow / (1+rate) ** t / float(365)) for t, cashflow in zip(ts, cashflows)])
```

我们运行一下这个函数，计算一下小明这一通操作的 NPV（备选投资的回报率取 8%）：
```python
>>> dates = [datetime.date(2021, 1, 1), datetime.date(2021, 2, 1), datetime.date(2021, 2, 26)]
>>> cashflows = [-1000, 550, 600]
>>> rate = 0.08  # 这里取年化收益率 8%
>>> xnpv(dates, cashflows, rate)
139.37372400893355
```

得到的 NPV > 0，因此小明的这段时间投资是优于年化 8% 回报率的投资的。

不过这里为了方便讲解，这个例子只取了两个月的三次投资用于计算。事实上，跨度只有一两个月的高风险投资与固定年化收益的投资是没有比较意义的。股市有风险，短期的收益可能只是因为市场波动，无法说明长期投资也会有同样表现。我们的重点还是应该关注在 NPV 的计算上。

另外，聪明的你可能已经发现了，改写后的 `npv` 函数，我采用了 `xnpv` 作为名字，这个命名正是来自于 Excel 的同名公式 [XNPV](https://support.microsoft.com/en-us/office/xnpv-function-1b42bbf6-370f-4532-a0eb-d67c16b664b7)。那么接下来我们再到 Excel 里用 `XNPV` 进行一下检验：

{% image https://mengqistatic.azureedge.net/staticfiles/personal-finance-101-xnpv/Excel-XNPV.png Excel XNPV 计算  %}

成功！Excel 给出了和我们的 `xnpv` 实现相同的结果。撒花~

# 版权声明
<span>题图来自 <span>Photo by <a href="https://unsplash.com/@markuswinkler?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Markus Winkler</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

本文所有文字和图片除声明外，版权均属本人所有，如需转载请注明来源。
