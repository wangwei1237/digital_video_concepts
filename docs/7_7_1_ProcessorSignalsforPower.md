# Processor Signals for Power
在典型的低功耗英特尔架构平台（如英特尔凌动Z2760）中，为电源接口定义的处理器信号如表7-4所示。可以适当地测量这些信号来完成功耗分析。

**表7-4.** 电源接口的重要处理器信号

| 信号 | 描述 |
| --- | --- |
| $$V_{CC}$$ | Processor core supply voltage: power supply is required for processor cycles. |
| $$V_{NN}$$ | North Complex logic and graphics supply voltage. |
| $$V_{CCP}$$ | Supply voltage for CMOS Direct Media Interface (cDMI), CMOS Digital Video Output (cDVO), legacy interface, JTAG, resistor compensation, and power gating. This is needed for most bus accesses, and cannot be connected to VCCPAOAC during Standby or Self-Refresh states. |
| $$V_{CCPDDR}$$ | Double data rate (DDR) DLL and logic supply voltage. This is required for memory bus accesses. It needs a separate rail with noise isolation. |
| $$V_{CCPAOAC}$$ | JTAG, C6 SRAM supply voltage. The processor needs to be in Active or Standby mode to support always on, always connected (AOAC) state. |
| LVD_VBG | LVDS band gap supply voltage: needed for Low Voltage Differential Signal (LVDS) display. |
| $$V_{CCA}$$ | Host Phase Lock Loop (HPLL), analog PLL, and thermal sensor supply voltage. |
| $$V_{CCA180}$$ | LVDS analog supply voltage: needed for LVDS display. Requires a separate rail with noise isolation. |
| $$V_{CCD180}$$ | LVDS I/O supply voltage: needed for LVDS display. |
| $$V_{CC180SR}$$ | Second generation double data rate (DDR2) self-refresh supply voltage. Powered during Active, Standby, and Self-Refresh states. |
| $$V_{CC180}$$ | DDR2 I/O supply voltage. This is required for memory bus accesses, and cannot be connected to $$V_{CC180SR}$$ during Standby or Self-Refresh states. |
| $$V_{MM}$$ | I/O supply voltage. |
| $$V_{SS}$$ | Ground pin. |
