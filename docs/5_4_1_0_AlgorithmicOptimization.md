# 算法优化
视频编码算法多会采用以牺牲性能为代价来提高视频质量，例如在编码过程中使用B帧，在运动估计中使用多帧参考，两遍（two-pass）码率控制[^1]，R-D朗格朗日优化，自适应去块滤波器等。

```shell
# 使用ffmpeg执行2-pass编码
ffmpeg -i <input> -c:v libx264 -b:v 1M -pass 1 -f mp4 /dev/null
ffmpeg -i <input> -c:v libx264 -b:v 1M -pass 2 <output>.mp4
```

另一方面，算法的性能优化会尝试以两种方式来提升性能：

* 第一种方法是使用快速算法，快速算法通常以更高的复杂性，更高的功耗或更低的质量为代价进行性能优化。文献1中也提供了性能和复杂性的联合优化方法[^2]。
* 第二种方法是算法的并行化优化，这种优化方式不会对视频质量造成严重损失[^3]。

[^1]: 二次（或更多次）编码让编码器对视频内容进行预估成为了可能。第一次编码会计算出编码每一帧画面的开销，然后在第二次编码中更有效地利用数据空间。这确保了在特定的码率限制下，输出画质能达到最好。

[^2]: J. Zhang, Y. He, S. Yang, and Y. Zhong: Performance and Complexity Joint Optimization for H.264 Video Coding.

[^3]: S. M. Akramullah, I. Ahmad, and M. L. Liou: Optimization of H.263 Video Encoding Using a Single Processor Computer, Performance Tradeoffs and Benchmarking. 