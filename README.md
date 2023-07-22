[toc]
# uinaleo.aleo

[Explore Demo](https://sweet-cloud-8731.on.fleek.co/)

## Build Guide

To compile this Aleo program, run:
```bash
aleo build
```

## pool合约

- 创建池子
- 初始流通性：记录
- 添加流通性：记录
- 赎回流通性：记录
- swap：
    - 查询（或后端实现）
        - 所有代币信息（名称）
        - 所有Pool交易对
            ```shell
            [{
                tokenA:10000, 100 - 1 = 99; 99+10000
                tokenB:8000,  				8000-x	
            },{
                tokenA:9000, 
                tokenC:8000,  				
            }]
          ```
        - 根据用户钱包，查询用户的Pool交易对
            ```shell
            [{
                totaltokenA:20000, 
                totaltokenB:16000, 
                lp:50%
            },{
                totaltokenA:12000, 
                totaltokenC:10000,  
                lp:25%,				
            }]
            ```

## 交易对合约

- 部署合约
    - 填表，线下完成（Uniswap + TokenA + TokenB）
- 初始流通性：

- 添加流通性：
    - 参数：poolname，recordA， recordB
- 赎回流通性
    - 参数：poolname
- swap（支持滑点）

## 参考资料

https://www.jianshu.com/p/2150daec3aa1
