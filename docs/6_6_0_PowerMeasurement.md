# 电源功率测量

既然我们已经涵盖了功率优化的不同领域，那么让我们考虑如何实际测量功率。在本节中，我们介绍了测量方法和各种功率测量注意事项。
测量和考虑系统各个级别的电源的能力使系统设计人员或用户可以了解现有的电源管理策略，或根据需要部署优化的电源管理策略。测量功率可以发现与功率有关的问题，从而导致系统成本更高。测量功率的主要动机包括：
* 了解应用程序对系统功耗的影响，并可能通过调整应用程序找到优化机会。
* 确定软件更改在用户级别，驱动程序级别或内核级别的影响；并了解由于代码更改而导致的性能或功耗下降。
* 验证是否已从软件中删除调试代码。
* 确定电源管理节省的电量功能，并验证这些功能已打开。
* 确定每瓦性能以驱动性能和功率调整，从而在实际的热约束环境中获得最佳折衷。
但是，很少有工具和说明可用来测量平台中的功耗。同样，根据对精度的要求，可以使用不同的功率测量方法，从简单且便宜的设备到专用数据采集系统（DAQ）。我们提出了各种功率测量方法。
