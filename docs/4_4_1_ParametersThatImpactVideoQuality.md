# 影响视频质量的参数
理解本节介绍的各种参数对最终的视觉质量产生的影响非常重要。特别是对于视频编码方案的基准测试，优化或比较分析而言，理解这些参数对视觉质量的影响尤其重要。

## Number of lines in the vertical display resolution（显示设备的垂直分辨率）
高清电视（*HDTV*）的分辨率为1,080或720行像素。相比之下，标清数字电视（*DTV*）是480行像素（对于NTSC，其中525条扫描线中有480条可见）或576行像素（对于PAL/SECAM，其中625条扫描线中有576条可见）。例如，DVD的分辨率是标清，而蓝光光盘则是高清。编码器可以根据需要来降低视频的分辨率，这取决于可用的比特数和需要达到的质量等级。然而，最近的编码器在大多数应用中通常处理视频的全分辨率。

## Scanning type（图像扫描类型）
数字视频使用两种类型的图像扫描模式：逐行扫描（*progressive scanning*）或隔行扫描（*interlaced scanning*）。在刷新帧时，逐行扫描重绘视频帧的所有行，并且通常表示为：720p或1080p。隔行扫描一次绘制一个场（*field*），在第一次刷新操作期间绘制奇数行，然后在第二次刷新期间绘制剩余的偶数行。因此，隔行刷新率是逐行刷新率的两倍。例如，隔行扫描的视频通常表示为480i或1080i。

物体的运动会对隔行扫描视频的感知质量产生影响。在逐行扫描的显示器上，由于较高的刷新率，隔行扫描视频为帧中的静止对象产生更好的质量；但是当帧中的对象移动时，由于隔行扫描视频失去高达50%的分辨率，因此会产生梳状噪声（*combing artifacts*）。请注意，当且仅当两个场编织在一起形成单个帧，然后显示逐行扫描的显示设备上时，才会发生梳状噪声。当在隔行扫描显示器上显示隔行内容时或者使用不同的去隔行算法（例如bob算法）用于逐行扫描显示器时，不会发生梳状噪声。

实际上，因为由帧的奇数行和偶数行组成的两个场在时间上发生移位，因此两个隔行扫描场构成单个帧。Frame pulldown和segmented frames是一种允许通过隔行视频流的方式发送全帧视频的特殊技术。为了在传输系统的接收端进行适当的重建和显示，必需跟踪首先发送哪个场。

##  Number of frames or fields per second（帧率）
欧洲的电视广播系统一般采用50赫兹的帧率，而美国则为60赫兹。众所周知的720p60格式的含义是：分辨率为1280×720像素，采用逐行扫描，每秒60帧。1080i50或者1080i60格式的含义是：分辨率为1920×1080像素，采用隔行扫描，每秒50/60场。如果不能维持正确的帧率/场率，就会导致产生可见的闪烁噪声（*flickering artifact*）。帧丢失（*Frame drop*）和帧抖动（*frame jitter*）是由帧率管理不当引起的视频质量问题。

## Bit rate（码率）
可以通过为每秒视频数据分配一定数量的比特位来控制数字视频的压缩量。码率是定义视频质量的主要因素。较高的码率通常意味着更高质量的视频。利用可跳过宏块（*skippable macroblocks*）的优势，可以实现有效的比特分配，同时有效的比特分配机制还基于宏块的时空（*spatio-temporal*）复杂性。量化级数也是由可用的码率来确定，并且量化级数会高度影响变换块（*transform block*）边界处的块效应。

## Bit-rate control type（码率控制类型）
码率控制取决于传输系统的某些限制和应用的性质。有的传输系统具有固定的信道带宽并且需要以固定码率（*CBR, constant bit rate*）传送视频内容。但是，其它的传输系统允许动态码率（*VBR, variable bit rate*），其中数据量可以在每个时间段上发生变化。CBR意味着视频的解码速率是恒定的。通常，解码缓冲区用于保存已经解码完成的比特流，直到帧的数据已经显示给用户为止。CBR在流视频应用中非常有用。在流视频应用中，为了满足固定码率的需求，可能需要发送没有有用信息的填充比特（*stuffing bits*）。

VBR允许为视频的复杂部分分配更多的比特位，而为相对简单的部分分配更少的比特位。用户给定视频的主观质量值，编码器会根据用户的质量需求来分配比特位，从而实现用于预期的质量水平。因此，使用VBR可以获得更好的观看体验。但是，VBR产生的压缩视频仍然需要满足可用的信道带宽，因此需要最大的码率限制。VBR编码方法通常允许用户指定最大/或最小码率范围。与CBR相比，VBR通常更合适于存储类型的应用。

除了CBR和VBR之外，还可以使用平均码率（*ABR, average bit rate*）编码来保证输出的视频流具有可预测的、长期的平均码率。

## Buffer size and latency（缓冲区大小和延迟）
正如前面所述，因为输入视频可能以固定码率或动态码率到达，因此解码器的缓冲区会临时存储接收的视频。缓冲区将会在特定的时刻删除缓存的帧的数据。这个特定的时刻就是从缓冲器中取出一帧的数据用于显示给用户时。而删除的比特位数则根据帧的类型而变化。对于固定容量的缓冲区，则必须小心地保持数据的到达速率和删除速率，从而保证缓冲区不会溢出数据或缺少数据。缓冲区的管理通常由速率控制机制来完成。速率控制机制会控制量化级数并管理所得到的帧的大小。如果缓冲区溢出，则最新到达的数据将会丢失，此时则可能无法显示接下来的一个或多个帧（无法显示的帧的数量取决于帧的依赖性）。如果缓冲区没有数据，则解码器将没有需要解码的数据。此时，显示器将继续显示先前显示的帧，并且解码器必须等到解码器刷新信号到达时才能纠正该情况。缓冲区开始填充数据的时间和从缓冲区中取出第一帧的时间之间存在一个最初的延迟。该延迟也就是所谓的解码延迟。通常，在解码器开始消耗缓冲区数据之前，缓冲区的填充比例通常控制在缓冲区大小的50％~90％。

## Group of pictures structure（GOP结构）
帧的预测结构决定了视频序列中帧的依赖顺序。在第二章中我们介绍过：因为I帧通常作为一组图像的锚点（*anchor*），因此I帧的编码是独立进行的，并且需要给其分配更多的比特位。P帧和B帧通常会有更高的量化级别，导致其具有更高的压缩率，随之而带来的代价是单个图像的质量相对较差。因此，图像组的排列非常重要。对于典型的广播应用，每秒需要发送2次I帧。并且，在两个I帧之间，使用P帧和B帧进行填充，从而达到在I帧或P帧之间存在2个B帧。使用更多的B帧通常并不能改善视觉质量，但是B帧的使用还是取决于应用。值得注意的是，具有长期参考的预测并非适用于场景高速变化的视频。高效的编码器需要先执行场景分析从而确定最终图片组的结构。

## Prediction block size（预测块的大小）
可以使用各种尺寸的预测块来执行帧内预测或帧间预测。预测块的尺寸一般为16×16 ~ 4×4。为了有效编码，必须根据视频帧中的细节模式选择合适的预测块大小。例如，具有更精细细节的区域需要更小尺寸的预测块，而平坦区域则可使用更大尺寸的预测块。

## Motion parameters（运动参数）
运动估计的搜索类型、搜索区域、以及代价函数（*cost function*）在确定视觉质量中起着重要作用。全搜索算法（*full search algorithm*）检查每个搜索位置以找到最佳匹配块，但代价是计算复杂度非常高。研究表明，编码计算中，超过50%的时间都消耗在块匹配过程。块匹配计算的复杂度会随着搜索区域的变大（捕获大运动或适应更高分辨率的视频）呈指数增长。此外，匹配标准可以从如下的技术中进行选择：绝对误差和（*SAD, sum of absolute difference*）[^1]和hadamard变换后的绝对误差和（*SATD, sum of absolute transformed differences*）[^2]。使用SATD作为匹配标准可以使用更高的计算复杂度为代价而提供更好的视频质量。

## Number of reference pictures（参考帧数量）
对于运动估计，可以从前向或后向参考的列表中使用一个或多个参考图像。多个参考图像会增加获取到更好匹配的概率，进而使得差异信号（*difference signal*）更小并且可以提升编码效率。因此，在视频具有相同总比特数的条件下，多参考图像的最终质量会更好。此外，视频的最终质量还取决于视频内容，在某些视频中，某一帧可能与非前后邻近帧或非近邻帧之间存在更好地匹配。在这种情况下，就需要长期（*long-term*）参考。

## Motion vector precision and rounding（运动向量的精度）
可以在各种精度级别执行运动补偿：全像素，半像素，四分之一像素等。精度越高，找到最佳匹配块的概率就越大。更精确的匹配导致使用更少的比特来编码误差信号（*error signal*）。因此，与全像素运动补偿相比，四分之一像素运动补偿为相同数量的比特数提供了更好的视觉质量。舍入的方向和数量对于保持足够的数据细节也很重要，从而实现更好的质量。舍入参数一般因为预测块类型（帧内或帧间）的不同而不同。

## Interpolation method for motion vectors（运动向量的插值方法）
可以使用不同类型的滤波器来完成运动矢量插值（*motion vector interpolation*）。典型的插值方法采用双线性、4抽头[^3]（*4-tap*）或6抽头（*6-tap*）滤波器。这些滤波器产生不同质量的运动矢量，进而导致最终视觉质量的差异。一般而言，6抽头滤波器产生最佳质量，但其在处理周期和功耗方面更昂贵。

## Number of encoding passes（编码通道数）
单通道编码（*single-pass encoding*）实时分析和编码数据。在编码速度是最重要因素的场景（例如，在实时编码应用程序）中，需要使用单通道编码。但是，当编码质量最重要时，需要使用多通道编码。多通道编码一般会在两个通道中执行编码操作。由于输入数据在每个通道中都会经过额外处理，因此多通道编码会花费更长的时间。在多通道编码中，使用一个或多个初始通道来收集视频特征数据，并且最后的通道使用该数据以便在指定的目标码率下实现均匀的质量。

## Entropy coding type（熵编码类型）
熵编码类型（如CABAC[^4]或CAVLC[^5]）一般不会影响视频质量。但是，如果存在码率限制（尤其是对于低目标码率）时，为了获取更高的编码效率，CABAC可以产生更好的视觉质量。

[^1]: SAD即绝对误差和，就是以左目图像的源匹配点为中心，定义一个窗口D，统计其窗口的灰度值的和，然后在右目图像中逐步计算其左右窗口的灰度和的差值，最后搜索到的差值最小的区域的中心像素即为匹配点。SAD仅反映残差时域差异，影响PSNR值，不能有效反映码流的大小。

[^2]: SATD即将残差经哈德曼变换的4×4块的预测残差绝对值总和，可以将其看作简单的时频变换，其值在一定程度上可以反映生成码流的大小。

[^3]: 抽头数是变压器中的一个概念，抽头数越多，我们就可以得到越多的电压信号。对于滤波器，每一级都保存了一个经过延时的输入样值，各级的输入连接和输出连接被称为抽头。

[^4]: CABAC（Context-based Adaptive Binary Arithmetic Coding），基于上下文的自适应二进制算术编码。CABAC是H.264/AVC标准中两种熵编码中的一种，它的编码核心算法就是算术编码（Arithmetic Coding）。

[^5]: CAVLC(Context Adaptive VariableLength Coding)是在H.264/MPEG-4AVC中使用的熵编码方式。在H.264中，CAVLC以zig-zag顺序用于对变换后的残差块进行编码。CAVLC是CABAC的替代品，虽然其压缩效率不如CABAC，但CAVLC实现简单，并且在所有的H.264profile中都支持。