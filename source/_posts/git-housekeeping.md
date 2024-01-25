title: Git 仓库大扫除
tags:
  - git
  - 工具
  - 小技巧
category: 编程
date: 2018-09-18 23:09:02
---

{% image https://blog.mengqi.life/images/git-housekeeping/banner.jpg %}

Git 可以说是目前最受欢迎的版本管理工具了，很多团队也都在用它来管理自己的项目代码。在一个多人协作的项目中，往往采用的是一个分支一个特性进行开发，随着每天的代码提交、合并，仓库中会有越来越多的冗余分支。这么多死分支不仅会掩盖真正在使用的分支，而且也为管理带来不便。如果你像我一样，也经常被淹没在 `git branch` 或 `git branch -r` 返回的分支大海中，那么，就是时候考虑给你的 git 仓库做一次大扫除了！

## 本地分支与远程分支
大扫除之前，首先给自己做个深呼吸，回忆一下远程仓库和远程分支的概念。

我们本地的仓库既保留有本地的分支，也保留有跟踪远程仓库的 remote 分支（类似 `remotes/origin/**` 这种的）。后者相当于是远程仓库分支在本地仓库的代理，每次 `git fetch` 或 `git pull` 时，都会将远程仓库的分支同步到本地对应的 remote 分支上。

比如远程仓库新增了一个 `feature/add_a` 分支，那么我们在本地 `git fetch` 后，会得到一个 `remotes/origin/feature/add_a` 分支，这个名字表示 `origin` 这个远程仓库下的 `feature/add_a`，`origin` 是本地给远程仓库默认起的名字，你当然也可以改成别的名字。

理清楚了本地分支和远程分支，本地仓库和远程仓库，接下来我们就动起手来做清理吧！

<!-- more -->

## 本地分支清理
查看我们本地的分支只需要执行一下
```sh
git branch
```

我们还可以找出所有已经合入到 `master` 的本地分支

```sh
git checkout master
git branch --merged
```

针对这些已经合入的分支，如果确定已经不会使用的话，就可以将其删除了

```sh
git branch -d feature/XXX
```

如果十分确定所有合入的分支都不再需要了，那么可以考虑一次性解决（`(^\*)` 是匹配当前分支，其余 `(master|dev)` 部分可以根据自己项目的实际情况进行修改）

```sh
git branch --merged | grep -v "(^\*|master|dev)" | xargs git branch -d
```

这么一来，就可以安全地删除所有已经不再需要的分支了。除此之外，也可以浏览一下没有合入 master 的本地分支，检查看看哪些分支已经废弃，不需要继续开发了

```sh
git branch --no-merged
```

针对这些分支，只用 `git branch -d` 命令会收到系统的善意提醒。如果十分确定可以删除，那么可以使用强制删除命令（一定要确认好啊）

```sh
git branch -D feature/XXX
```

经过这么一番清理，相信你的本地分支现在已经十分轻佻了，`git branch` 返回的结果看起来也十分清爽。接下来就来清理一下本地的远程分支。

## 远程分支清理

远程分支的查看只需要在 `git branch` 命令加一个 `-r`(`--remotes`) 参数即可

```sh
git branch -r
```

远程分支的清理，一方面是清理远程分支中，已经合入 `master` 的分支，另一方面是清理远程仓库已经删除了的分支，而本地还在跟踪的。

第二种情况的清理非常简单，只需要执行

```sh
git remote prune origin
```

事实上，我们可以在每次 `git fetch` 时，添加一个参数 `-p` (`--prune`)，这样每次 fetch 远程仓库时都可以顺手删掉本地多余的分支（建议将 `git fetch -p` 直接 alias 到 `git fetch` 命令~）。

再来看第一种情况，虽然同样可以通过 `git branch -r --merged` 来查看已经合入 `master` 的分支，但由于远程分支不只是自己开发的，所以还需要别人的确认才能进行删除。
好在我们可以在命令行的帮助下快速筛选出每个人的分支，然后就可以把这份统计摘要发给 TA 来确认。

```sh
for branch in `git branch -r --merged | grep -v HEAD`; do echo -e `git show --format="%ci %cr %an" $branch | head -n 1`; done | sort -r | grep AUTHOR_NAME
```

这行命令首先是过滤出所有已合入 `master` 的远程分支(`git branch -r --merged | grep -v HEAD`)，然后遍历每个分支，展示(`git show`)其最后一次提交的绝对时间(`%ci`)、相对时间(`%cr`)和作者(`%an`)信息，按时间倒序排列(`sort -r`)，最后过滤出作者是 `AUTHOR_NAME` 的分支。

如果想查看更多的信息，可以在 `git show` 的 `format` 加上 `%s`（提交信息）和 `%h`（commit SHA1 前缀）

这样一份报告，给到相关开发同学，确认之后，就可以执行批量清理了。注意，远程分支的删除应该到远程仓库去删除（否则下次 fetch 还会再拉下来），因此需要我们把这个删除动作 push 到远程仓库。

最后，如果你 push 了删除动作到远程仓库，不要忘了提醒下其他同学 `git fetch -p` 来同步删除自己本地的远程分支哈！

```sh
git push origin --delete feature/YYY
```

### 找找我是谁
如果自己经常换机器开发、push 代码，而且不同机器的 git config 不完全一样的话（比如我不同机器上 user.name 有的是英文名有的是中文名），提交的作者签名也不一样，这时还需要根据不同的 user.name 进行查找……

不过好在我们有命令行，用以下命令就能得到仓库里所有提交过的作者了~

```sh
git shortlog -s
```

版权声明：
---
本文中所有文字版权均属本人所有，未经允许请勿转载。

鸣谢：
---
题图 by The Creative Exchange on Unsplash
