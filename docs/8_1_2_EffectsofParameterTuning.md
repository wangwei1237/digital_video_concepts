# 参数调整的效果
各种编码参数影响性能和电量消耗以及视觉质量之间的关系。调参的目的往往是发掘获得更高的性能，更好的质量，及节省电量的方法。此外，调参也可以暴露出那些未优化视频应用中的低效率问题，以及造成这些低效率的潜在原因，所有这些都可以带来更好的解决方案。

通常，相比于降低耗电量，这种调整的影响在改进视觉质量和性能中更容易看到。正如第4章和第5章所述，许多参数对性能和质量都有重大影响，包括视频空间分辨率，帧速率和比特率; 图片结构的基团; 参考图片数量; 模式决策和运动矢量确定中的R-d优化; 自适应去块滤波器; 各种级别的独立数据单元，例如宏块，切片，帧或图像组;多次分析和处理，多代压缩以及预处理和后处理过滤器; 和特效过滤器。

其中一些参数对视觉质量有较大影响，而其他参数则对性能和功率更有益; 参数调优工作应该把这些相对的收益考虑在内。例如，使用B图片能够同时显著影响视觉质量和性能，但在模式决策和运动矢量确定中使用R-D优化，相比于它对视觉质量的改善，减慢编码速度的影响更显著。 类似地，使用多个切片会略微降低视觉质量，但它可以提高可并行性和可扩展性，从而提供提升性能和节电机会。

此外，重要的是要考虑在编码视频保持合理视觉质量的同时可以节省多少电量或提高性能。视频内容的性质和比特分配策略是这里的重要考虑因素。