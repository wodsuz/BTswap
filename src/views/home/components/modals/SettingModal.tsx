import React from "react";
import Modal from "@/components/extra/Modal";
import ImageImporter from "@/plugin/ImageImporter";
// interface Iprops {
//     tolerance : number
//     setTolerance : () => void
//     speed : number
//     setSpeed : () => void
//     deadline : number
//     setDeadline : () => void
// }
function SettingModal({
  tolerance,
  setTolerance,
  speed,
  setSpeed,
  deadline,
  setDeadline,
}: any) {
  return (
    <Modal titleModal={"Setting"} modalName={"setting-modal"}>
      <section className="flex flex-wrap w-full p-2">
        <div className="flex flex-wrap items-center w-full py-2 rounded-xl">
          <div className="flex flex-wrap items-center w-full rounded-xl">
            <ImageImporter
              src={"/img/icons/chart-line-icon.svg"}
              w={25}
              h={25}
            />
            <span className="mx-2 font-bold text-gray-400">
              Slippage Tolerance
            </span>
          </div>
          <div className="flex items-center w-full p-3 mt-3 bg-swap-selection-input rounded-xl">
            <div className="w-1/3">
              <input
                value={tolerance}
                onChange={(e) => setTolerance(e?.target?.value)}
                type="number"
                className="w-full text-xl bg-transparent input"
              />
            </div>
            <div className="flex flex-wrap items-center w-2/3 ">
              <div className="flex flex-wrap items-center justify-between w-full px-2">
                <span className="text-gray-400 hover:[text-shadow:_0px_5px_8px_#EF233C] font-bold cursor-pointer">
                  0.1%
                </span>
                <span className="text-gray-400 hover:[text-shadow:_0px_5px_8px_#EF233C] font-bold cursor-pointer">
                  0.5%
                </span>
                <span className="text-gray-400 hover:[text-shadow:_0px_5px_8px_#EF233C] font-bold cursor-pointer">
                  1%
                </span>
                <span className="text-gray-400 hover:[text-shadow:_0px_5px_8px_#EF233C] font-bold cursor-pointer">
                  2%
                </span>
              </div>
              <div className="flex flex-wrap w-full mt-2">
                <div className="flex flex-wrap justify-between w-full p-2 bg-custom-cart rounded-xl ">
                  <input
                    value={tolerance}
                    onChange={(e) => setTolerance(e.target.value)}
                    type="range"
                    step="4"
                    className="rounded-md range range-sm range-error"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full py-2 rounded-xl">
          <div className="flex flex-wrap items-center w-full rounded-xl">
            <ImageImporter src={"/img/icons/speed.svg"} w={25} h={25} />
            <span className="mx-2 font-bold text-gray-400">
              Transaction speed
            </span>
          </div>
          <div className="flex items-center w-full p-3 mt-3 bg-swap-selection-input rounded-xl">
            <div className="w-1/3">
              <input
                type="text"
                value={speed}
                onChange={(e) => setSpeed(e?.target.value)}
                className="w-full text-xl font-bold bg-transparent input"
              />
            </div>
            <div className="flex flex-wrap items-center w-2/3 ">
              <div className="flex flex-wrap items-center justify-between w-full px-2">
                <span className="text-gray-400 hover:[text-shadow:_0px_5px_8px_#EF233C] font-bold cursor-pointer">
                  Normal
                </span>
                <span className="text-gray-400 hover:[text-shadow:_0px_5px_8px_#EF233C] font-bold cursor-pointer">
                  Fast
                </span>
                <span className="text-gray-400 hover:[text-shadow:_0px_5px_8px_#EF233C] font-bold cursor-pointer">
                  Instant
                </span>
              </div>
              <div className="flex flex-wrap w-full mt-2">
                <div className="flex flex-wrap justify-between w-full p-2 bg-custom-cart rounded-xl ">
                  <input
                    type="range"
                    step="4"
                    className="rounded-md range range-sm range-error"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full py-2 rounded-xl">
          <div className="flex flex-wrap items-center w-full rounded-xl">
            <ImageImporter src={"/img/icons/clock-light.svg"} w={25} h={25} />
            <span className="mx-2 font-bold text-gray-400">
              Transaction deadline
            </span>
          </div>
          <div className="flex items-center w-full p-3 mt-3 bg-swap-selection-input rounded-xl">
            <div className="w-1/3">
              <input
                type="number"
                value={deadline}
                onChange={(e) => setDeadline(e?.target.value)}
                className="w-full text-xl font-bold bg-transparent input"
              />
            </div>
            <div className="flex flex-wrap items-center w-2/3 ">
              <div className="flex flex-wrap items-center justify-end w-full px-2">
                <span className="text-gray-400 hover:[text-shadow:_0px_5px_8px_#EF233C] font-bold cursor-pointer">
                  minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}

export default SettingModal;
