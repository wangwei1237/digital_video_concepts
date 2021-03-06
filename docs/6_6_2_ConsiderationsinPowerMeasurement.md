# 电源测量需要考虑的因素

在测量功率时，通常会考虑以下因素：
* 被测处理器部件的TDP。
* 数据采集系统的准确性和准确性；DAQ和相关软件用于将模拟电压信号实时转换为数字数据序列以及进行后续处理和分析的功能。
* 从一组测量到另一组测量的环境温度，散热和冷却变化；为了避免因环境因素而导致的每次运行之间的差异，通常会进行三轮测量，并考虑中间测量值。
* 单独注释适当的电源轨以节省电能，同时以1 kHz的典型采样率（即每1毫秒采样一次）记录所有电源轨上的功耗，并且具有与热相关的测量窗口在1-5秒之间作为移动平均线。
* 识别操作系统后台任务和电源策略；例如，当没有媒体工作负载在运行并且处理器显然处于空闲状态时，CPU可能仍在忙于运行后台任务；另外，操作系统的节能策略可能已经调整了CPU的高频限制，需要仔细考虑。
* 考虑一段时间内的平均功率为了消除电源瞬变中的突然尖峰，并且仅考虑稳态功耗行为。
* 包括综合设置和常用场景的基准； 为高端用途考虑的适当工作负载，以便系统的各个部分有机会达到其潜在极限。
* 考虑使用最新的可用图形驱动程序和媒体SDK版本，因为在驱动程序和中间件级别可能进行了功耗优化； 此外，使用新的图形驱动程序可能会导致功耗或性能下降，例如对GPU内核，内存，PLL，电压调节器设置和超频（turbo）设置的潜在更改。