# 操作系统的电源管理

现代操作系统通常提供许多电源管理功能。 Linux，Windows，OS X和Android均使用较新的ACPI标准而不是旧的BIOS控制的高级电源管理（APM）支持更智能的电源管理。但是，所有主要操作系统都一直在为基本的电源管理功能提供稳定的支持，例如向用户空间发出电源事件通知（例如，电池状态指示，空闲时挂起CPU等）。

在以下各节中，我们将讨论Linux和Linux的电源管理。Windows操作系统。在Linux电源管理的上下文中，提到了三个重要组件：X Window，Window Manager和英特尔嵌入式图形驱动程序（IEGD）。 Windows电源管理包括Windows电源要求，电源策略，Windows驱动程序模型和Windows驱动程序框架。还简要介绍了Windows 8下的设备电源管理，然后讨论了如何处理电源请求。