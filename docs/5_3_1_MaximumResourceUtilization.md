# 资源利用率最大化

应用程序，服务，驱动程序和操作系统会竞争重要的系统资源：包括处理器时间，内存，硬盘，网络带宽和电池电量。而这些系统资源意味着的资金的投入，从这个层面讲，为了发挥资金的最大效能，必须在尽可能短的时间内最大限度地利用可用的系统资源。从而实现，以最小功耗获得最大性能。为此，通常会采用以下技术。

## 任务并行
许多任务彼此之间相互独立，不存在资源的相互等待，因此可以并行运行。任务并行化能够使CPU得到充分利用。通常而言，任务流水线也可以在任务执行期间保持资源繁忙，从而实现资源利用率的最大化。

## 寄存器，缓存和内存利用率
存储器是分层次的，离CPU越近的存储器，速度越快，每字节的成本越高，同时容量也因此越小。

寄存器速度最快，离CPU最近，成本最高，所以个数容量有限。其次是高速缓存（缓存也是分级，有L1，L2等缓存），再次是主存（普通内存），再次是本地磁盘。

对于性能而言，优化内存层级的使用是一个重要的因素。

寄存器的操作（*register transfer operations*）由CPU控制并以CPU的处理速度完成。高速缓存通常为静态随机存取存储器（SRAM），并且由存储器管理单元（MMU）控制。在系统级程序中需要仔细使用多级缓存，从而平衡数据的访问延迟和数据容量。

内存一般为动态RAM（DRAM），内存的容量比缓存大得多，但数据访问速度比缓存低。采用命中率来表示相邻级别的存储器之间的数据传输性能：在某个存储器中找到信息的概率。存储器的访问频率和有效访问时间取决于程序行为和对存储器设计的选择。通常，对程序跟踪的全面分析可以产生优化的机会。

## 优化磁盘访问
视频编码过程会处理大量的数据。因此，与处理过程本身相比，磁盘的I/O速度、内存延迟、内存带宽等因素经常会成为性能瓶颈。很多文献提供了许多关于磁盘访问的优化技术。RAID（*edundant arrays of inexpensive disks，廉价磁盘冗余阵列*）是一种常见的数据存储虚拟化技术。RAID可以控制数据的访问，并可权衡磁盘的可靠性，可用性，性能和容量。

## 指令流水线
目前，CPU的架构有：复杂指令计算集（CISC）处理器，精简指令计算集（RISC）处理器，超长指令字集（VLIW）处理器，矢量超级计算机等。对于不同的CPU架构，每个指令的执行周期会因其对应的时钟频率的不同不同。但是，仍然需要需要认真对待指令流水线和流水线同步，从而要实现最少的无操作（NOP）和流水线停顿，进而优化资源利用率。