# 低功耗状态的组合
表7-3列出了典型的将系统的低功耗状态和ACPI功耗状态组合而形成的典型的低功耗处理器。第6章介绍了ACPI功耗状态，因此此处仅添加S0iX的效果，以便能够解释的更加清楚。

**表7-3.** 系统低功耗状态的定义


| 状态 | 描述 |
| :--- | :--- |
| G0/S0/PC0 | Full on. CPUs are active and are in package C0 state. |
| G0/S0/PC7 | CPUs are in C7 state and are not executing with caches flushed; controllers can continue to access DRAM and generate interrupts; DDR can dynamically enter deep self-refresh with small wake-up latency. |
| G0/S0 | Standby ready. CPU part of the SoC is not accessing DDR or generating interrupts, but is ready to go standby if the PMC wants to start the entry process to S0iX states. |
| G0/S0i1| Low-latency standby state. All DRAM and IOSF traffic is halted. PLLs are configured to be off. |
| G0/S0i1 with audio | Allows low-power audio playback using the low-power engine (LPE), but data transfer happens only through specific interfaces. Interrupt or DDR access request goes through the PMC. The micro-architectural state of the processor and the DRAM content are preserved. |
| G0/S0i2 | Extended low-latency standby state. S0i2 is an extension on S0i1—it parks the last stages of the crystal oscillator and its clocks. The DRAM content is preserved. |
| G0/S0i3 | Longer latency standby state. S0i3 is an extension on S0i2—it completely stops the crystal oscillator (which typically generates a 25 MHz clock). The micro-architectural state of the processor and the DRAM content are preserved. |
| G1/S3 | Suspend-to-RAM (STR) state. System context is maintained on the system DRAM. All power is shut to the noncritical circuits. Memory is retained, and external clocks are shut off. However, internal clocks are operating. |
| G1/S4 | Suspend-to-Disk (STD) state. System context is maintained on the disk. All power is shut off, except for the logic required to resume. Appears similar to S5, but may have different wake events. |
| G2/S5 | Soft off. System context is not maintained. All power is shut off, except for the logic required to restart. Full boot is required to restart. |
| G3 | Mechanical off. |

如上的数据来源于： [Source: Data Sheet, Intel Corporation, April 2014.](www.intel.com/content/dam/www/ public/us/en/documents/datasheets/atom-z36xxx-z37xxx-datasheet-vol-1.pdf)
