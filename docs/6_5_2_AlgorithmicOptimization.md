# 算法优化

算法优化的目标是通过快速运行任务并在不需要时关闭处理单元来减少执行时间。这可以通过多种方式实现，包括：
* 由于功耗与执行驻留时间成正比，因此在CPU中运行较少的代码可以减少功耗。因此，执行关键软件模块的代码优化有助于算法优化。
* 平台支持将处理任务卸载到专用的省电固定功能媒体硬件块中。
* 为了在给定用法的任务管道中执行各个阶段，通常需要将数据扩展为阶段中的某些中间表示形式。存储此类数据需要更大的内存和缓存带宽。通过最小化存储器带宽可以降低功耗方面的存储器事务处理成本。因此，带宽减少技术是算法优化的重要考虑因素。
* 可以探索管道的各个阶段或子阶段之间可用的并发性，并可以采取适当的并行化方法来减少执行时间。
* 可以通过适当的缓冲来优化I/O操作，以打包大量数据，然后进行更长的空闲时间，因为频繁的短传输不会使模块有机会在空闲时间掉电。此外，I/O优化应考虑磁盘访问延迟和文件中的碎片，因为它们可能对功耗产生重大影响。
* 适当的中断调度和合并为最大化空闲时间提供了机会。
* 所有活动任务可以在平台的所有部分（例如，CPU，GPU，I/O通信和存储）重叠。
在进行算法优化时应考虑到功能，性能和质量之间的权衡。根据应用程序的要求，在尝试节省功率时，应注意保持性能和/或视觉质量。以下各节介绍了一些常见的算法优化技术。

# 降低计算复杂度
当不主动进行计算时，计算设备或系统仅消耗很少的功率，因为​​仅显示引擎需要唤醒。其他计算引擎可能暂时处于睡眠状态。降低计算复杂度的思想是，仅在必要时将系统保持在高功率或繁忙状态，并尽可能使系统返回空闲状态。改善应用程序的性能可以轻松实现节能，因为它可以使系统更早地返回空闲状态，因为工作可以更快地完成。
有几种降低计算复杂性的方法，包括算法效率，活动占空比降低，最小化诸如忙等待锁和同步之类的开销，减少在特权模式下花费的时间以及提高I / O处理的效率。接下来，我们将讨论其中一些方法，但是要对它们进行彻底的处理，请参阅能源感知计算。

# 选择有效的数据类型
通过使用整数算术，可以优化浮点计算中比较繁琐的算法。例如，使用提升方案的离散小波变换计算通常涉及许多浮点运算。但是提升系数可以用2的幂的有理数来实现，因此数据路径中的浮点单元可以用整数算术单元代替[^9]。这样可以节省功耗，因为降低了硬件复杂性。

类似地，以适合于利用编译器优化的方式来重新布置代码，或者以某种数据相关性允许在进入循环之前而不是在循环内部之前进行计算的方式来重新布置代码，可以显着提高性能，从而节省功率。在一个音频应用示例中[^10]，显示了一些正弦和余弦函数在忙碌循环中的固定值上反复调用；由于值是固定的，因此可以在进入循环之前进行计算。此优化可提高大约30％的性能，同时还可以节省功耗。

在另一个示例中，运动矢量和离散余弦变换计算是在像素矢量上完成的[^11]，而不是分别使用每个像素11，这不仅使纯软件H.263视频编码器的整体性能提高了5％，而且还提供了通过两种方式来节省电力：通过更快地进行计算，以及通过使用改进的内存访问和缓存一致性。

# 代码并行化和优化
消除代码运行时，处理能力的效率低下问题，也是代码并行化和优化的目标。多线程，流水线，向量化，减少在特权模式下花费的时间以及避免轮询构造是代码并行化和优化的常用技术。
使用所有可用资源的适当线程的应用程序通常比单线程对应的应用程序更早完成，并且更有可能提供性能和功耗优势。在这种情况下，选择正确的同步原语是
也很重要一些应用程序，尤其是媒体应用程序，特别适合在多核或多处理器平台中使用多线程进行改进。在Steigerwald等人提到的多线程媒体播放示例中[12]，虽然实现了几乎线性的性能扩展，但同时四核处理器的功耗也降低了一半，因为所有四个核都忙于运行平衡的工作负载。
类似地，可以通过使用矢量操作（例如单指令多数据（SIMD））在相同时钟周期上对数据矢量有效地执行对不同数据的相同操作。大多数现代处理器都支持SIMD操作。英特尔自动矢量化扩展（AVX）在单个处理器时钟周期内支持八个32位浮点同时操作。正如Steigerwald等人所声称的[^13]，对于媒体播放应用程序，使用此类SIMD操作可能会导致大约
功耗降低30％。
在清单6-1中，请注意以下Direct3D查询结构和轮询构造
只会消耗CPU周期，导致功率浪费。
程序如6-1 Direct3D查询结构的轮询示例（低功耗）
```cpp
        while（S_OK！= pDeviceContext-> GetData（pQuery，＆queryData，
sizeof（UINT64），0））
		{
            sleep (0); // wait until data is available
		}
```
睡眠（0）; //等待数据可用
最好使用阻塞结构来挂起CPU线程。然而，
Windows 7 DirectX处于非阻塞状态。尽管使用OS原语的阻塞解决方案可以避免繁忙等待循环，但是这种方法还会增加延迟和性能损失，并且可能不适用于某些应用程序。相反，可以使用软件解决方法，其中启发式算法在循环中检测到GetData（）调用。在这种解决方法的示例中[14]，功率降低至3.7W，而性能不会下降。清单6-2显示了解决方法的概念：

程序如6-2轮询构造的替代示例
// ...
```cpp
INT32 numClocksBetweenCalls = 0;
INT32 averageClocks = 0;
INT32 count = 0;
// Begin Detect Application Spin-Loop
// ... ...
UINT64 clocksBefore = GetClocks();
if ( S_OK != pDeviceContext->GetData( pQuery, &queryData, sizeof(UINT64), 0)) {
        numClocksBetweenCalls = GetClocks() - clocksBefore;
        averageClocks += numClocksBetweenCalls;
        count++;
        if ( numClocksBetweenCalls < CLOCK_THRESHOLD )
        {
                averageClocks /=count;
                if ( averageClocks < AVERAGE_THRESHOLD )
                {
                    WaitOnDMAEvent( pQuery, &queryData, sizeof(UINT64) ); 
                    return queryData;
                } else {
                    return queryBusy;
        else {
             return queryBusy;
        } 
     }
else {
    return queryData;
}
// End Detect Application Spin-Loop
```

减少内存传输
限制数据移动和有效的数据处理可带来更好的性能和更低的功耗。在这种连接方式下，通过使用内存和缓存层次结构将数据保持在尽可能靠近处理元素的位置，并最大程度地减少了从主内存的数据传输，效率更高。


由于减少了存储器访问次数，因此减少了存储器传输可以减少功耗，即使是以适度增加计算复杂性为代价。Bourge和Jung提出了通过对图像中的预测图片使用嵌入式压缩来减少存储器的传输[^15]。编码反馈回路。可以使用嵌入式编码方案，该方案将参考帧以压缩格式保留在帧存储器中，以便与常规未压缩编码方法相比使用大约三分之一的存储器。如果使用无损压缩，则所需的内存将减半。

但是，通过使用基于块的内存访问并通过仔细管理
嵌入式编码方案的计算复杂度Bourge和Jung显示出总体上可以节省功率[^16]。他们通过对编码方案施加一些限制来实现这一目标，这是一种有损方案，能够获得更好的压缩率和相应的功率。比无损计划更省钱。这些限制包括独立地编码每个块，固定每个块的压缩率以及将亮度和色度块共同存储在存储器中。最终结果是，即使计算复杂度增加，在功耗方面占主导地位的内存传输也可以节省55％。
尽管此特定方案会导致较高比特率下的视觉质量下降，但使用适当的无损方案可能会节省总体功耗
由于较少的内存传输。最重要的是，由于减少了内存传输，因此可以使用更靠近CPU的嵌入式较小内存，从而减少访问期间的电缆耗散。在某些硬件实现中，可以使用低成本的片上存储器代替片外SDRAM。

[^8]: B. Steigerwald, C. D. Lucero, C. Akella, and A. R. Agrawal, Energy Aware Computing(Intel Press, 2012).
[^9]: P. P. Dang and P. M. Chau, “Design of Low-Power Lifting Based Co-processor for Mobile Multimedia Applications,” Proceedings of SPIE 5022 (2003): 733–44.
[^10]: Steigerwald et al., Energy Aware Computing.
[^11]: S. M. Akramullah, I. Ahmad, and M. L. Liou, “Optimization of H.263 Video Encoding Using a Single Processor Computer: Performance Tradeoffs and Benchmarking,” IEEE Transactions on Circuits and Systems for Video Technology 11, no. 8 (August 2001): 901–15.
[^12]: Steigerwald et al., Energy Aware Computing.
[^13]: Ibid.
[^14]: D. Blythe, “Technology Insight: Building Power Efficient Graphics Software,” Intel Developer Forum, 2012.
[^15]: A. Bourge and J. Jung, “Low-Power H.264 Video Decoder with Graceful Degradation,” Proceedings of SPIE 5308 (2004): 372–83.
[^16]: Ibid.