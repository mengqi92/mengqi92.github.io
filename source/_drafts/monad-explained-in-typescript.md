---
title: 理解 Monad
categories:
  - 函数式编程
tags:
  - Haskell
  - Functional Programming
  - TypeScript
  - JavaScript
date: 2019-12-01 19:46:00
---

Haskell 语言中有一个非常重要（也非常烧脑）的概念叫 Monad。它是使 Haskell 成为「纯函数」式语言的基石。我刚接触到这个概念时觉得非常烧脑，尤其是看到它和范畴论的关系以及复杂的理论说明，直到最近在工作中实际接触了 TypeScript 中的异步编程时，才恍然大悟，原来 Monad 不远不近，就在我们身边！

Haskell 引入 Monad 很重要的用途就是隔离副作用，使我们可以放心的编写和推导纯函数的运算。但 Monad 其实作用远不止于此，大部分需要封装上下文、链式解耦逻辑的场合其实都可以用上 Monad 这种思想。后面会介绍一下异步编程中是如何用到 Monad 思想的。

考虑到 TypeScript 是 JavaScript 的强类型版本，因此本文将采用 Haskell 和 TypeScript 语法来介绍 Monad。

<!-- more -->

介绍 Monad 之前，还有两个概念也很重要：Functor 和 Application。这两个可以说和 Monad 是层层递进的关系。下面就先来介绍一下它们。

<!-- TODO -->

## 问题
假设我们有一个文本文件，里面每行都存了一个 URL，我们需要通过 HTTP GET 请求访问 URL 并拿到 HTTP Response，再打印输出。再假设文本文件不会太大，文件内容完全可以放入内存。那么用代码描述就是需要这么几个函数：

```typescript
readFile(file: File): String
getLines(text: String): [String]
getUrl(string: String): URL
httpGet(url: URL): String
print(string: String): void
```

可以发现，我们定义的这一系列函数是正好可以顺序调用的，前一个函数的输出就是下一个函数的输入。这样写就是一个很完整的同步串行实现了。然而，由于整个过程有大量的 I/O 操作，顺序执行必然效率不高。那么如何把整个过程改为异步的并发实现呢？

### 什么是异步
首先，我们来想一下什么是异步（Async）？异步的函数其实就是「被推迟」执行了的函数。比如异步执行一个函数 `Foo(a: int): boolean` 时，这个函数不需要立即执行，而是可以返回一个「知道了，做好了回你」的承诺。我们把这个承诺用一个概念表示，先叫它 `Deferred<Foo>`。在一段时间后这个函数终于被调用（调用时机看 CPU 的安排，也有可能立即被调用），等这个函数执行完后，由它再通知之前叫他的那段代码接着执行后面的逻辑。

概念上是这么说，而具体实现时又有各种实现方法，至少我了解到的就有 callback, Promise, async/await, yield/generator 等实现。还是用我们的读取 URL 文件的例子说明，比如我们在 `getLines` 函数中，想要每分出来一行 URL 就调用 `httpGet` 异步地发一下请求。在请求执行并返回结果之前，我们可以继续分割剩下文本中的 URL。在请求返回结果之后，则应调用 `print` 函数对结果进行打印输出。

### Functor
<!-- TODO： 先介绍 Maybe 及其封装上下文的特点 -> MaybeMap(https://www.seas.upenn.edu/~cis194/spring13/lectures/09-functors.html) -> functor -->
Functor 是一个类型类，主要是通过 `fmap` 在 Haskell 中的类型定义是
```haskell
```

#### 同步实现
这样的场景，用同步实现就是：
```typescript
private getLinesAndPrint(text: String): void => {
    text.split("\n").map(getUrl).forEach((url: URL): void => {
        print(Deferred(httpGet(url)));
    })
}
```

#### Callback 实现
用 Callback 回调方法实现就是：
```typescript
private getLinesAndPrint(text: String): void => {
    text.split("\n").map(getUrl).forEach((url: URL): void => {
        _deferred(httpGet(url), (responseText: String): void => {
            print(responseText);
        });
    });
}

private _deferred(
    functionToExec: (url: URL) => String, 
    callback: (responseText: String) => void): void {
        // implementation ...
    }
```

#### Promise 实现
用 ES6 的 Promise 实现就是：
```typescript
private getLinesAndPrint(text: String): void => {
    Deferred(httpGet(url)).then(()) //TODO: maybe not necessarily put all implementations here
}
```

异步本质上其实是往我们代码中「塞」入了时间的概念。

 比如 `readFile(file: File): String` 不直接执行返回 `String`，而是