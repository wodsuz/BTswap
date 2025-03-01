/* eslint-disable */
import ImageImporter from "@/plugin/ImageImporter";
import { FaAngleDown } from "react-icons/fa";
import dynamic from "next/dynamic";
import { IToken, Token } from "@/interfaces/IToken";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { erc20, pair } from "@/lib/ContractFunctions";
import { useBalance, usePublicClient, useWalletClient } from "wagmi";
import { formatEther } from "viem";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setTokenAData, setTokenBData } from "@/store/actions/tokenChartAction";

import SwapModal from "../modals/SwapModal";

const SelectTokenModal = dynamic(
  () => import("@/components/extra/SelectTokenModal")
);
const SettingModal = dynamic(
  () => import("@/views/home/components/modals/SettingModal")
);

interface ISwapCart {
  contractAddress: string;
  tokenData: IToken;
}

const initialToken0: Token = {
  address: `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`,
  chainId: 84531,
  decimals: 18,
  extensions: {
    bridgeInfo: {},
  },
  logoURI: "/img/icons/eth.svg",
  name: "Ethereum",
  symbol: "ETH",
};
const initialToken1: Token = {
  address: `0xB66540499d050fFA30e5a5D275bDA0E1176F1963`,
  chainId: 84531,
  decimals: 18,
  extensions: {
    bridgeInfo: {},
  },
  logoURI:
    "https://raw.githubusercontent.com/ve33-dex/SwapArchiveData/main/icon/0xB66540499d050fFA30e5a5D275bDA0E1176F1963.png",
  name: "BaseSwap",
  symbol: "BASES",
};

function SwapCart(props: ISwapCart) {
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [gasStatus, setGasStatus] = useState<boolean>(false);
  const [tokenA, setTokenA] = useState<Token>(initialToken0);
  const [tokenB, setTokenB] = useState<Token>(initialToken1);

  const [historySelect, setHistorySelect] = useState<Token>(initialToken0);

  const changeOrder = () => {
    setTokenB(tokenA);
    setTokenA(historySelect);
  };
  useEffect(() => {
    setHistorySelect(tokenB);
  }, [tokenA, tokenB]);

  const publicClient = usePublicClient();
  const walletClient = useWalletClient();
  const dispatch = useAppDispatch();
  const [balanceOfTokenA, setBalanceOfTokenA] = useState<bigint>(BigInt(0));
  const [balanceOfTokenB, setBalanceOfTokenB] = useState<bigint>(BigInt(0));

  const [amountA, setAmountA] = useState<bigint>(BigInt(0));
  const [amountB, setAmountB] = useState<bigint>(BigInt(0));

  const [pairAddress, setPairAddress] = useState<`0x${string}`>(
    "0x0000000000000000000000000000000000000000"
  );

  const [reserveA, setReserveA] = useState<bigint>(BigInt(0));
  const [reserveB, setReserveB] = useState<bigint>(BigInt(0));

  const [userAddress, setUserAddress] = useState<`0x${string}`>(
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swapRate, setSwapRate] = useState<number | null>(0.00005869); // Simulated rate

  const token0 = erc20(publicClient, walletClient.data, tokenA.address);
  const token1 = erc20(publicClient, walletClient.data, tokenB.address);

  function getAmountOut(
    amountIn: bigint,
    reserveIn: bigint,
    reserveOut: bigint
  ): bigint {
    if (
      Number(amountIn) <= 0 ||
      Number(reserveIn) <= 0 ||
      Number(reserveOut) <= 0
    ) {
      return BigInt(0);
    }

    const amountInWithFee = Number(amountIn) * 9975; // Apply 0.25% fee
    const numerator = amountInWithFee * Number(reserveOut);
    const denominator = Number(reserveIn) * 10000 + amountInWithFee;

    return BigInt(Math.floor(numerator / denominator)); // Return estimated amount
  }

  useEffect(() => {
    setAmountB(getAmountOut(amountA, reserveA, reserveB));
  }, [amountA]);

  useEffect(() => {
    const pairContract = pair(publicClient, walletClient.data, pairAddress);

    async function fetchReserve() {
      const token0 = await pairContract.read.token0();
      const token1 = await pairContract.read.token1();
      const result = await pairContract.read.getReserves();

      if (tokenA.address === token0) {
        setReserveA(result[0]);
      } else if (tokenA.address === token1) {
        setReserveA(result[1]);
      }

      if (tokenB.address === token0) {
        setReserveB(result[0]);
      } else if (tokenB.address === token1) {
        setReserveB(result[1]);
      }

      if (token0 === "0x041638a7D668Bb96121Eb0D7fF0C9241AB9d2f80") {
        if (
          tokenA.address === "0x041638a7D668Bb96121Eb0D7fF0C9241AB9d2f80" ||
          tokenA.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ) {
          setReserveA(result[0]);
        } else if (
          tokenB.address === "0x041638a7D668Bb96121Eb0D7fF0C9241AB9d2f80" ||
          tokenB.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ) {
          setReserveB(result[0]);
        }
      } else if (token1 === "0x041638a7D668Bb96121Eb0D7fF0C9241AB9d2f80") {
        if (
          tokenA.address === "0x041638a7D668Bb96121Eb0D7fF0C9241AB9d2f80" ||
          tokenA.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ) {
          setReserveA(result[1]);
        } else if (
          tokenB.address === "0x041638a7D668Bb96121Eb0D7fF0C9241AB9d2f80" ||
          tokenB.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ) {
          setReserveB(result[1]);
        }
      }

      console.log(
        result,
        token0,
        token1,
        reserveA,
        reserveB,
        tokenA.address === token0,
        tokenB.address === token1
      );
    }

    if (pairAddress != "0x0000000000000000000000000000000000000000") {
      fetchReserve();
    } else {
      setReserveB(BigInt(0));
      setReserveA(BigInt(0));
    }
  }, [pairAddress, tokenA, tokenB]);

  useEffect(() => {
    async function fetchPairAddress(
      token0Address: `0x${string}`,
      token1Address: `0x${string}`
    ) {
      // const address = await factory.read.getPair([token0Address, token1Address]);
      // console.log(address);
      // setPairAddress(address);
    }

    if (tokenA.address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      fetchPairAddress(
        "0x041638a7D668Bb96121Eb0D7fF0C9241AB9d2f80",
        tokenB.address
      );
    } else if (tokenB.address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      fetchPairAddress(
        tokenA.address,
        "0x041638a7D668Bb96121Eb0D7fF0C9241AB9d2f80"
      );
    } else {
      fetchPairAddress(tokenA.address, tokenB.address);
    }
  }, [tokenA, tokenB]);

  useEffect(() => {
    if (walletClient.data) {
      setUserAddress(walletClient.data.account.address as `0x${string}`);
    }
  }, [walletClient]);

  const { data: userETHBalance } = useBalance({
    address: userAddress,
  });

  useEffect(() => {
    // Update amountA based on slider
    setAmountA((balanceOfTokenA * BigInt(rangeValue)) / BigInt(100));

    if (swapRate) {
      setAmountB(BigInt(Math.floor(Number(amountA) * swapRate * 100000)));
    }
  }, [rangeValue, amountA, swapRate]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (tokenA.address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
          setBalanceOfTokenA(userETHBalance!.value);
        } else {
          const balanceOfToken0 = await token0.read.balanceOf([userAddress]);
          setBalanceOfTokenA(balanceOfToken0);
        }

        if (tokenB.address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
          setBalanceOfTokenB(userETHBalance!.value);
        } else {
          const balanceOfToken1 = await token1.read.balanceOf([userAddress]);
          setBalanceOfTokenB(balanceOfToken1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBalance();
  }, [tokenA, tokenB, walletClient]);

  function updateInput(e: ChangeEvent<HTMLInputElement>) {
    const inputAmount = BigInt(Number(e.target.value) * 10 ** 18); // Convert to WEI
    setAmountA(inputAmount);

    if (swapRate) {
      // Scale swapRate by 10^18, then divide after multiplication to maintain precision
      const scaledSwapRate = BigInt(Math.floor(swapRate * 10 ** 18));
      setAmountB(inputAmount * scaledSwapRate);
    }
  }

  const [tolerance, setTolerance] = useState<any>(0);
  const [speed, setSpeed] = useState<any>("Fast");
  const [deadline, setDeadline] = useState<any>(5);

  // @ts-ignore
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <h4 className="text-xl font-bold text-white">Swap</h4>
        <figure className="flex">
          <div className="p-0 bg-transparent border-0 btn hover:bg-transparent ">
            <label htmlFor="setting-modal">
              <ImageImporter
                w={20}
                h={20}
                className="mx-1 cursor-pointer"
                src={"/img/icons/setting.svg"}
                alt={"setting-button"}
              />
            </label>
          </div>
          <SettingModal
            tolerance={tolerance}
            setTolerance={setTolerance}
            speed={speed}
            setSpeed={setSpeed}
            deadline={deadline}
            setDeadline={setDeadline}
          />
          <ImageImporter
            w={20}
            h={20}
            className="ms-1"
            src={"/img/icons/miniCartIcon.svg"}
            alt={"mini-chart-button"}
          />
        </figure>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full p-2 mt-2 bg-custom-cart rounded-xl">
        <div className="flex flex-wrap items-center justify-between w-full">
          <figure className="flex items-center justify-between ">
            <ImageImporter
              w={20}
              h={20}
              src={"/img/icons/wallet.svg"}
              alt={"wallet-icon"}
            />
            <span className="p-0.5 ms-0.5 border rounded-full border-green-400">
              {" "}
            </span>
            <figcaption className="p-2 text-white">
              <div className="font-bold">
                {Number(formatEther(balanceOfTokenA)).toFixed(10)}{" "}
                {tokenA.symbol}
              </div>
            </figcaption>
          </figure>
        </div>
        <div className="flex flex-wrap justify-between w-full p-2 bg-custom-cart rounded-xl ">
          <input
            aria-label="Swap range"
            onChange={(e) => setRangeValue(Number(e?.target.value))}
            type="range"
            min={0}
            max="100"
            defaultValue={rangeValue}
            className="range range-sm range-error  rounded-md w-[82%]"
          />
          <div className="w-[15%] items-center  flex bg-custom-cart rounded-xl">
            <span className="bg-gray-500 rounded-[5px] me-1 text-xs p-0.5">
              {" "}
              {rangeValue}%{" "}
            </span>
            <ImageImporter
              w={20}
              h={20}
              src={"/img/icons/Edit.jpg"}
              alt="pen-icon"
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-5 bg-custom-cart rounded-xl">
          <div className="flex justify-between w-full p-2 ">
            <figure className="flex">
              <ImageImporter
                w={20}
                h={20}
                src={"/img/icons/Arrow-top-right.svg"}
                alt={"ArrowTopRight"}
              />
              <figcaption className="text-xs text-gray-500 ms-2">
                You Pay
              </figcaption>
            </figure>
          </div>
          <div className="flex items-center justify-between w-full p-2">
            <input
              aria-label="Swap amount"
              className="w-1/2 p-2 text-xl bg-transparent input"
              value={Number(formatEther(amountA)).toFixed(10)}
              onChange={(e) => updateInput(e)}
            />
            <div className="flex flex-row items-center justify-center">
              <label
                htmlFor="first_token_modal"
                className="bg-transparent active:bg-gray-700 select-bordered select-sm ms-1 w-auto max-w-xs flex flex-row gap-[10px]"
              >
                <ImageImporter
                  w={35}
                  h={20}
                  src={tokenA.logoURI}
                  alt={"symbol"}
                />
                <span>{tokenA.symbol}</span>
              </label>
              <FaAngleDown />
              <SelectTokenModal
                tokenName="first_token_modal"
                fetchSelectToken={(dataToken) => {
                  dispatch(setTokenAData(dataToken));
                  dataToken === tokenB
                    ? toast.error("token the same !")
                    : setTokenA(dataToken);
                }}
                tokenList={props.tokenData}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full">
        <button
          title="Swap Tokens"
          type="button"
          onClick={changeOrder}
          className="absolute duration-100 active:scale-90 "
        >
          <ImageImporter
            src={"/img/icons/swap-arrow.svg"}
            alt={"SwapArrow"}
            w={40}
            h={40}
            className="flex -left-1 -top-1"
          />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full p-2 mt-2 bg-custom-cart rounded-xl">
        <div className="flex flex-wrap items-center justify-between w-full">
          <figure className="flex items-center justify-between ">
            <ImageImporter
              w={20}
              h={20}
              src={"/img/icons/wallet.svg"}
              alt={"wallet-icon"}
            />
            <span className="p-0.5 ms-0.5 border rounded-full border-red-600">
              {" "}
            </span>
            <figcaption className="p-2 text-white">
              <div className="font-bold">
                {Number(formatEther(balanceOfTokenB)).toFixed(10)}{" "}
                {tokenB.symbol}
              </div>
            </figcaption>
          </figure>
        </div>
        <div className="flex flex-wrap w-full mt-5 bg-custom-cart rounded-xl">
          <div className="flex justify-between w-full p-2 ">
            <figure className="flex ">
              <ImageImporter
                w={20}
                h={20}
                src={"/img/icons/arrow-left-bottom.svg"}
                alt={"ArrowBottomLeft"}
              />
              <figcaption className="text-xs text-gray-500 ms-2">
                You Receive
              </figcaption>
            </figure>
          </div>
          <div className="flex items-center justify-between w-full p-2">
            <div className="w-1/2 p-2 text-xl bg-transparent">
              {" "}
              {Number(formatEther(amountB)).toFixed(10)}{" "}
            </div>
            <div className="flex flex-row items-center justify-center">
              <label
                htmlFor="second_token_modal"
                className="bg-transparent active:bg-gray-700 select-bordered select-sm ms-1 w-auto max-w-xs flex flex-row gap-[10px]"
              >
                <ImageImporter
                  w={35}
                  h={20}
                  src={tokenB.logoURI}
                  alt={"symbol"}
                />
                <span>{tokenB.symbol}</span>
              </label>
              <FaAngleDown />
              <SelectTokenModal
                tokenName="second_token_modal"
                fetchSelectToken={(dataToken) => {
                  dispatch(setTokenBData(dataToken));
                  dataToken === tokenA
                    ? toast.error("token the same !")
                    : setTokenB(dataToken);
                }}
                tokenList={props.tokenData}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-full p-2 ">
        <div className="flex items-center w-2/3">
          <ImageImporter
            w={20}
            h={20}
            src={"/img/icons/info-circle-light.svg"}
            alt={"info-icon"}
          />
          <div className="text-xs font-bold ps-2">
            1 {tokenA.symbol} ={" "}
            {formatEther(
              getAmountOut(BigInt(1000000000000000000), reserveA, reserveB)
            )}{" "}
            {tokenB.symbol}
          </div>
        </div>
        <button
          onClick={() => (gasStatus ? setGasStatus(false) : setGasStatus(true))}
          className="flex items-center justify-end w-1/3 p-1 bg-transparent "
        >
          <ImageImporter
            w={20}
            h={20}
            src={"/img/icons/gas.svg"}
            alt={"gas-icon"}
          />
          <div className="flex px-2 text-xs font-bold">$0.99</div>
          <ImageImporter
            w={8}
            h={8}
            className={
              gasStatus ? "rotate-90 duration-300" : " duration-300 rotate-0"
            }
            src={"/img/icons/arrow-right.svg"}
            alt={"arrow-right"}
          />
        </button>
        {gasStatus && (
          <div
            className={`flex w-full flex-wrap text-xs  font-bold content-start overflow-hidden duration-300 ${
              gasStatus ? "h-[200px] border-t my-4" : "h-0 p-0 my-4"
            } `}
          >
            <div className="flex flex-wrap items-center justify-between w-full py-2 my-1 ">
              <div className="text-gray-400">Network fee</div>
              <div>{"<"}$0.99</div>
            </div>
            <div className="flex flex-wrap items-center justify-between w-full py-2 my-1 ">
              <div className="text-gray-400">Price impact</div>
              <div>0.1%</div>
            </div>
            <div className="flex flex-wrap items-center justify-between w-full py-2 my-1 ">
              <div className="text-gray-400">Minimum output</div>
              <div>
                {Number(formatEther((amountB * 999n) / 1000n)).toFixed(10)}{" "}
                {tokenB.symbol}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between w-full py-2 my-1 ">
              <div className="text-gray-400">Expected output</div>
              <div>
                {Number(formatEther(amountB)).toFixed(10)} {tokenB.symbol}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between w-full py-2 my-1 mt-3 border-t ">
              <div className="text-gray-400">Routing source</div>
              <div>BaseSwap</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full">
        <button
          type="button"
          className="w-full btn bg-custom-red"
          onClick={() => setIsModalOpen(true)}
        >
          Swap
        </button>
        <SwapModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tokenA={{
            symbol: tokenA.symbol,
            logoURI: tokenA.logoURI,
            amount: amountA,
          }}
          tokenB={{
            symbol: tokenB.symbol,
            logoURI: tokenB.logoURI,
            amount: amountB,
          }}
          rate={swapRate}
          slippage={2}
        />
      </div>
    </div>
  );
}

export default SwapCart;
