# Windows 电源管理

Windows操作系统（尤其是Windows 8），相比于以往的Windows系统中的电源管理在此方面有了显着改进。

##电源需求
在Windows 8之前的版本中，电源要求涉及主要在移动个人计算机平台上支持常见的ACPI状态，例如S3和S4状态。 但是，Windows 8旨在在包括台式机，服务器，便携式笔记本电脑，平板电脑和电话在内的所有平台上标准化单一电源需求模型。 目标之一是提高便携式平台的电池寿命，而Windows
8将智能手机电源模型应用于所有平台，以实现从待机到就绪的快速过渡，并确保隐藏的应用程序消耗最少的资源或不消耗任何资源。

为此，Windows 8定义了表6-5.6中列出的需求[^6]。

| 需求类型 | 需求 |
| --- | --- |
| 系统电源 | 1.  最大电池寿命应该以最小的能源消耗来实现 |
| 需求 | 2.  启动和关闭的延迟应最小 |
| 需求 | 3.  应该以智能方式制定电源决策，例如，处于无法更改系统电源状态的最佳位置的设备不应这样做 |
| 需求 | 4.  应具有按需调整风扇或驱动器电动机以实现安静运行的功能 |
| 需求 | 5.  应以独立于平台的方式满足所有要求 |
| 设备电源 | 6.  设备（尤其是用于便携式系统的设备）必须非常注重功耗 |
| 需求 | 7.  设备应积极节省功耗：|
| 需求 | a. 应该提供即时功能 |
| 需求 | b. 低过渡到较高状态的延迟 |
| 需求 | c. 在可能的情况下，应将设备逻辑划分为单独的电源总线，以便可以根据需要关闭设备的某些部分 |
| 需求 | d. 应支持适当的已连接待机，以便快速连接 |
| Windows硬件 | 8.  Windows HCK测试要求所有设备必须支持S3和S4，而不会拒绝系统睡眠请求 |
| 认证 | 9.  待机和连接的待机必须持续数天 |
| 需求 | 10.  在D1-D3状态下，设备必须排队并且不能丢失I/O请求 |

## 电源策略
电源策略（也称为电源计划或电源方案）是操作系统定义的首选项，用于选择影响能耗的系统和BIOS设置。 对于每种电源策略，操作系统通常会设置两个不同的设置
默认情况下，一个使用电池电源，另一个使用交流电源。 为了尽可能节省电池，电池电源的设置旨在更积极地节省电量。 Windows默认情况下定义了三个电源策略：

* 性能模式：在性能模式下，系统尝试在不考虑功耗的情况下提供最佳性能。
* 平衡模式：在此模式下，操作系统尝试在性能和功耗之间达到平衡。
* 省电模式：在此模式下，操作系统尝试节省最大电量，以保留电池寿命，甚至牺牲一些性能。

用户可以创建或修改默认计划，但是电源策略受访问控制列表的保护。系统管理员可以覆盖用户对电源策略的选择。在Windows上，用户可以使用名为"powercfg.cpl"的小程序来查看和编辑权限策略。还提供了名为"powercfg.exe"的小程序的控制台版本，该版本允许更改访问控制列表权限。
应用软件可以通过注册电源计划来获取电源策略的通知，并可以通过多种方式使用电源策略：
* 根据用户当前的电源策略调整应用程序行为。
* 修改应用程序行为以响应电源策略的更改。
* 根据应用程序的要求移动到其他电源策略。 

## Windows驱动程序模型
在Windows驱动器模型（WDM）中，操作系统将请求发送到驱动程序，以将设备定为更高或更低的电源状态。收到此类请求后，驱动程序仅保存或恢复状态，跟踪设备的当前和下一个电源状态，而称为物理设备对象（PDO）的结构执行实际上增加或降低设备电源的工作。
但是，这种安排是有问题的，因为模型需要驱动程序
实现状态机以处理电源IRP（I / O请求数据包），以及
由于执行电源状态转换所需的时间，可能会导致不必要的复杂性。例如，对于断电请求，驱动程序将设备的状态保存在内存中，然后将请求传递给PDO，PDO随后将断电。只有这样才能将请求标记为已完成。但是，在随后可能发生的加电请求期间，驱动程序必须首先将该请求传递给PDO，然后PDO在恢复设备状态之前恢复供电，并通知驱动程序将请求标记为已完成。为了克服此困难，提出了Windows驱动程序框架（WDF）。

## Windows驱动程序框架
为了简化驱动程序中的电源管理，Windows在最新的Windows Driver Framework（WDF）驱动程序模型中引入了事件的概念。在此模型中，驱动程序中有可选的事件处理程序功能，由此框架在适当的时间调用事件处理程序以处理电源转换，从而消除了对复杂状态机的需求。
Windows 8以称为PoFx的电源框架的形式，提供了一种新的，更精细的方式来满足多功能设备上功能的电源需求。另外，
它引入了连接待机的概念，允许关闭电源的设备偶尔连接到外部世界并刷新状态或数据以用于各种应用程序。主要好处是可以从待机状态快速恢复到ON状态，就像系统一直处于唤醒状态一样。同时，功耗成本很低，足以使系统数天处于待机状态。

## Windows驱动程序框架
为了简化驱动程序中的电源管理，Windows在最新的Windows Driver Framework（WDF）驱动程序模型中引入了事件的概念。 在此模型中，驱动程序中有可选的事件处理程序功能，由此框架在适当的时间调用事件处理程序以处理电源转换，从而消除了对复杂状态机的需求。
Windows 8以称为PoFx的电源框架的形式，提供了一种新的，更精细的方式来满足多功能设备上功能的电源需求。 另外，
它引入了连接待机的概念，允许关闭电源的设备偶尔连接到外部世界并刷新状态或数据以用于各种应用程序。 这样做主要好处是可以从待机状态快速恢复到ON状态，就像系统一直处于唤醒状态一样。 同时，功耗成本很低，足以使系统数天处于待机状态。

## Windows 8中的设备电源管理
在Windows 8中，为响应即插即用（PnP）管理器的查询，
设备驱动程序宣布其设备的电源功能。 驱动程序对称为DEVICE_CAPABILITIES的数据结构进行了编程，指示该信息如表6-6所示。

| Field | Function |
| 设备D1和D2 | 指示设备是否支持D1或D2，或两者都支持 |
| 从Dx唤醒 | 指示设备是否支持从Dx状态唤醒 |
| 设备状态 | 定义与每个Sx状态相对应的Dx状态 |
| DxLatency | 到D0的标称过渡时间 |

从Dx迁移到D0时，设备存在延迟，这是因为设备需要一小段时间后它们才能再次运行。 对于较高的Dx状态，等待时间较长，因此从D3到D0的过渡将花费最长的时间。 此外，设备在响应新请求之前必须处于运行状态，例如，硬盘必须旋转后才能再次降低速度。 延迟由驱动程序通过DEVICE_CAPABILITIES数据结构宣布。


| `请注意`，如果在低功耗状态下没有花费足够的时间，则设备状态转换可能不值得，因为与设备处于特定状态时相比，转换本身可能会消耗更多的功率。 |
|--|

为了管理设备电源，Windows Power Manager需要知道每个设备的过渡延迟，即使对于同一设备，不同调用的延迟也可能不同。因此，使用者仅指示标称值。 Windows操作系统控制查询和设置的电源请求之间的时间间隔，在此期间设备进入睡眠状态。较高的时间间隔将增加睡眠时间，而较低的值将导致操作系统放弃关闭设备电源。
处理电源请求。Windows驱动程序模型（WDM）和Windows NT设备驱动程序使用称为I/O请求数据包（IRP）的内核模式数据结构与操作系统以及彼此之间进行通信。 IRP通常是由I/O管理器根据用户模式下的I/O请求创建的。在Windows 2000中，添加了两个新的管理器：即插即用（PnP）和电源管理器，它们也创建IRP。此外，IRP可以由驱动程序创建，然后传递给其他驱动程序。

## 处理电源请求
在Windows 8中，电源管理器将请求（即电源IRP）发送到设备驱动程序，命令它们更改相关设备的电源状态。电源IRP使用主要的IRP数据结构IRP_MJ_POWER，并具有以下四个可能的次要代码：
* IRP_MN_QUERY_POWER：一种查询，用于确定设备安全地进入新请求的Dx或Sx状态或关闭或重新启动设备的能力。如果设备能够在给定时间进行转换，则驱动程序应在宣布该功能之前将与转换相反的任何其他请求排队，因为SET请求通常在QUERY请求之后。
* IRP_MN_SET_POWER：将设备移至新的Dx状态或响应新的Sx状态的命令。通常，设备驱动程序会执行SET请求，而不会失败。总线驱动程序（如USB驱动程序）除外，如果设备正在卸下中，则总线驱动程序可能会返回故障。驱动程序通过请求适当更改设备电源状态，在移至较低电源状态时保存上下文以及在转换至较高电源状态时恢复上下文来满足SET请求。
* IRP_MN_WAIT_WAKE：请求设备驱动程序启用设备硬件，以便外部唤醒事件可以唤醒整个系统。一个这样的请求可以在任何给定的时间保持待定状态，直到外部事件发生为止。事件发生时，驱动程序返回成功。如果设备无法再唤醒系统，则驱动程序将返回故障，然后电源管理器将取消该请求。
* IRP_MN_POWER_SEQUENCE：查询D1-D3计数器，即设备实际处于低功耗状态的次数。睡眠请求之前的计数与睡眠请求之后的计数之间的差值将告诉电源管理器设备是否确实有机会进入低功耗状态，或者是否被长时间延迟禁止，以便电源管理器可以采取采取适当的措施，并且可能不会发出该设备的睡眠请求。

对于驱动程序开发人员而言，调用各种电源IRP的困难之一是确定何时调用它们。 Windows 8中的内核模式驱动程序框架（KMDF）实现了许多状态机和事件处理程序，包括用于电源管理的状态机和事件处理程序。通过调用事件处理程序，它简化了电源管理的任务
在适当的时间。典型的电源事件处理程序包括：D0进入，D0退出，设备电源状态更改，设备臂从S0/Sx唤醒以及设备电源策略状态更改。


[^6]: J. Lozano, Windows 8 Power Management. (StarJourney Training and Seminars, 2013.)