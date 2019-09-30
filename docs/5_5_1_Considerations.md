# Considerations
由于可配置的系统参数会影响整体性能，因此有必要将这些参数固定为某些值，以获得稳定、可靠、可重复的性能测量结果。例如，在进行性能测量之前，必须设置BIOS、操作系统的性能优化选项、英特尔图形通用用户界面（CUI）等[^1]。在BIOS设置时，应考虑以下因素：PCIe延迟，时钟门控，ACPI设置，CPU配置，CPU和图形电源管理控制，C-状态延迟，中断响应时间限制，图形渲染待机状态，超频状态， 等等。

正如我们在前面的讨论中所述：工作负载特征可能会影响性能。因此，另一个重要的考虑因素是工作负载参数。但是，通常很难收集并分析所有可能的编译时和运行时的性能指标。此外，工作负载和用于性能测量的相关参数的选择，通常由特定用法以及应用程序如何使用这些工作负载来确定。因此，重要的是要考虑实际的使用模型，以便选择合适的测试用例作为关键性能指标。例如，这种选择在比较两个视频编码解决方案时（这两种编码方案具有性能差异，但在其它方面却各具特点）非常有用。

[^1]: This graphics user interface works on a system with genuine Intel CPUs along with Intel integrated graphics. There are several options available—for example, display scaling, rotation, brightness, contrast, hue and saturation adjustments, color correction, color enhancement, and so on. Some of these options entail extra processing, incurring performance and power costs.