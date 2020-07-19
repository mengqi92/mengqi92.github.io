---
title: 个人财务 101 - 回报率
tags:
  - 个人财务
  - 投资
  - 笔记
category: 个人财务
mathjax: true
date: 2020-07-19 20:30:36
---

{% image https://mengqistatic.azureedge.net/staticfiles/personal-finance-101-rate-of-return/Banner.jpg %}

作为经济社会的一员，我们必不可少地需要掌握投资理财的知识和技能。然而遗憾地发现，个人财务方面免费靠谱的中文资料比较匮乏，对于我这种几乎零基础的自学者来说，很难找到免费系统的对一些基础概念的解释。后来发现了 [Investopedia](https://www.investopedia.com) 这个宝藏，不仅有全面的词条，而且很多概念的解释都有公式和例子搭配，十分方便自学。因此特将学习笔记记录于此，希望能帮助到其他和我有同样困扰的小伙伴。

# 回报率 Rate of Return

[回报率](https://www.investopedia.com/terms/r/rateofreturn.asp)是我们评估一个投资项目最基础的指标。它是一个归一化了的百分比，因此可以横向和其它投资项目进行比较。

$$\text{Rate of Return} = \frac{当前净值 - 初始净值}{初始净值} \times 100$$

回报率需要注意的几点：

1. **回报率对时间因素的考虑比较粗糙。**它只是基于投资起止两个时间点，而不是按照多个时间片计算的。
[复合年化增长率](https://www.investopedia.com/terms/c/cagr.asp)（就是年化收益率，Compound Annual Growth Rate）则是将时间因素考虑在内。
2. **回报率对[货币因素](https://www.investopedia.com/terms/t/timevalueofmoney.asp)的考虑也比较粗糙。**它没有考虑通货膨胀。
没有考虑通胀的回报率被称作「名义回报率」（Nominal Rate of Return），考虑了通胀的回报率被称作「真实回报率」（Real Rate of Return）。

可以看到，年化收益率计入了时间因素，但没计入货币因素；真实回报率计入了货币因素但没计入时间因素。那么我们将这两个因素同时考虑在内呢？这就是引入了折现率（[discount rate](https://www.investopedia.com/terms/d/discountrate.asp)）的[内部回报率](https://www.investopedia.com/terms/i/irr.asp)（Internal Rate of Return, IRR）。

<!-- more -->

# 复合年化收益率 CAGR

[复合年化收益率](https://www.investopedia.com/terms/c/cagr.asp)（Compound Annual Growth Rate）假设我们的资产每年再投资在同一个项目上，也就是一期是一年，以此计算每期的复合收益率。具体公式是：

$$\text{CAGR}=\frac{终期净值}{初始净值}^\frac{1}{n}-1$$

其中 n 就是从初始到终期经历的年数。

# 净现值 NPV

[净现值](https://www.investopedia.com/terms/n/npv.asp)（Net Present Value）就是将未来的现金流按折现率折合到现在的现金值。折现率可以用通货膨胀率（表示这堆钱不投资任何项目），也可以用一个 investment alternative 的回报率表示（表示拿这堆钱去投资这个备选项目）。简单地来看，NPV 就是「预期的现金流在今天的折现值」减去「投入的现金在今天的折现值」。

由于预期的现金流可能是分期入账的，因此实际上的计算需要每一期都单独作计算。比如一期之后的现金结余（就是这一期时间内现金流入减去流出）记作 R_t，那这一期折合到现在的现金值就是

$$\frac{R_t}{(1+i)^t}$$

其中，t 为期数，i 为折现率。

NPV 就是每一期现金值的累计：

$$NPV=\sum^n_{t=0}\frac{R_t}{(1+i)^t}$$

注意，这里把 t=0，也就是当前准备投入的现金值也计算在内了。

比如当前有一个投资机会：买入一台价值 ￥1,000,000 的设备，这台设备能用 5 年，每年能创造 ￥25,000 的收入。与此同时，这 ￥1,000,000 也可以选择投入到一个预期年化 8% 的股票市场里。假如作为公司经理，你改如何选择？

我们可以计算一下设备在未来 5 年带来的收入折合到当下的净现值（NPV）。

首先，我们初始的现金净流入就是 -￥1,000,000，这个现金就是现在的现金，不需要折现。接下来计算一下未来现金流的 NPV。

第一步，确定期数。我们 5 年的投资可以按月划分为 60 期。

第二步，确定折现率。由于我们有一个备选的 8% 股市投资，因此折现率就是 8%。注意，8% 是年化收益率，我们每期的收益率是：

$$每期收益率 = (1+0.08)^{\frac{1}{12}}-1=0.64%$$

第三步，计算每一期的 NPV。

第一个月，我们的现金净流入 ￥25,000，NPV 为：

$$\frac{￥25,000}{(1+0.0064)^1}=￥24,841.02$$

第二个月，我们的现金净流入 ￥25,000，NPV 为：

$$\frac{￥25,000}{(1+0.0064)^2}=￥24,683.05$$

以此类推，我们可以计算出来未来 60 期的 NPV。这整个的投资项目的 NPV 就是：

$$\text{NPV}=(-￥1,000,000)+\sum^{60}_{t=0}(\frac{￥25,000_{60}}{(1+0.0064)^{60}})$$

算下来结果是 ￥242,322.82，大于 0，因此我们购买设备而不去投资 8% 的股市是划算的。这是因为未来 5 年，相比于投资股市，这台设备能给我们带来——折合成今天的现金——￥242,322.82 的额外收入。

# 内部回报率 IRR

内部回报率（Internal Rate of Return）和净现值（Net Present Value, NPV）的是用同一个公式计算的，只不过求的未知数不同：

$$NPV=\sum^n_{t=0}\frac{R_t}{(1+i)^t}$$

我们求 NPV 时，是已知每一期的回报 R_t 和 折现率 i 求 NPV。而求内部回报率时，是已知 NPV=0 和每一期的回报 R_t，求折现率 i。

之前计算 NPV 时，我们知道，当所有期的累计回报折合到今天的现金 —— NPV 大于 0 时，说明投资收益超出折现率对应的收益（也就是通货膨胀带来的收益，或者说 investment alternative 的收益）；NPV 小于 0 时，说明投资收益少于折现率对应的收益。那么 NPV 等于 0 时，就是投资收益恰好等于折现率对应的收益。此时的折现率，其实就是我们这次投资的每期回报率了。

有了 NPV，为什么还需要 IRR 呢？因为 IRR 能帮助我们横向和其它（时间跨度不同，或是需要投入资金不同的）投资项目做对比。因为我们只需要两个项目各自的投资期数 t 和每期回报 R_t 就能计算出 IRR 并进行对比。

注意，NPV 计算时可以将 i 设置为通胀率，从而将货币因素考虑在内。而 IRR 在计算时则没有考虑通胀。

## IRR 与 NPV 的对比

一般说来，作为指标，IRR 要弱于 NPV。因为 

1. IRR 正如其名，是求的「内部」回报率，它计算时忽略了很多外部因素，比如资产价格或是通货膨胀；
2. IRR 在计算时，一般求得的是估计值，而 NPV 求得的是确定值；
3. IRR 计算得到的「回报率」和实际的回报率可能不符。IRR 中假设每期回报率是固定的，而且忽略了资本成本（cost of capital），这个假设在现实中也很难成立。因此现实中的投资，依靠 IRR 很有可能会得出乐观估计。

## IRR 与 CAGR 的对比

复合年化增长率 CAGR 测量的是期初到期末的回报情况，并没有考虑期中的现金流入流出，因此无法体现期中现金流入流出带来的回报。然而，相比 IRR 的估算，CAGR 计算非常简单，适合粗略估计自己的资产增长情况。

## IRR 的局限性

首先，IRR 是一种「率」，是一个相对值。这在比较不同的投资项目时会有帮助（因为对投资回报做了归一化），但是我们有时候可能也要关注投资带来的绝对收益（NPV）。比如，一个短期的 IRR 非常高的投资项目，可能实际上带来的 NPV 并不会很高；而一个长期的 IRR 比较低的项目，带来的回报缓慢但是稳定，最终带来的 NPV 可能反而很高。

其次，IRR 中假设的现金流入，是会再投资到项目里的，然而现实中这种情况可能并不多见，有时候我们仅仅是将盈利取出去做了别的事了。没有计入这些资本成本，往往会导致计算出的 IRR 过于乐观。因此就有了对 IRR 这个问题的修正版本：[MIRR](https://www.investopedia.com/terms/m/mirr.asp)（Modified Internal Rate of Return）。

不过，话说回来，IRR 还是适合用来在期初时对比多个不同的投资产品的。一般来说，如果投资产品带来的 IRR 高于资本成本，那么这个产品就是值得投资的。

# 参考资料
1. [回报率 Rate of Return](https://www.investopedia.com/terms/r/rateofreturn.asp)
2. [复合年化增长率](https://www.investopedia.com/terms/c/cagr.asp)
3. [净现值](https://www.investopedia.com/terms/n/npv.asp)
4. [MIRR](https://www.investopedia.com/terms/m/mirr.asp)

# 版权声明
<span>题图来自 <a href="https://unsplash.com/@kellysikkema?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Kelly Sikkema</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

本文所有文字版权均属本人所有，如需转载请注明来源。
