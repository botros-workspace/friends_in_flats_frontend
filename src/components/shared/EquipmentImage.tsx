import React, { FunctionComponent } from 'react'
import { BiCabinet } from 'react-icons/bi'
import { BsLamp, BsPrinter, BsTelephone } from 'react-icons/bs'
import { FaComputer, FaRegKeyboard } from 'react-icons/fa6'
import { GiBookshelf, GiDesk } from 'react-icons/gi'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { LuProjector } from 'react-icons/lu'
import { MdCoffeeMaker, MdOutlineScreenshotMonitor } from 'react-icons/md'
import {
  PiArmchair,
  PiFanDuotone,
  PiMouseMiddleClickDuotone,
  PiRugDuotone,
  PiTelevisionDuotone,
  PiThermometerHotDuotone,
} from 'react-icons/pi'
import { TbAirConditioning, TbSofa } from 'react-icons/tb'

type Props = {
  equipment: string
}
const EquipmentImage: FunctionComponent<Props> = ({ equipment }) => {
  if (equipment === 'desk') {
    return <GiDesk />
  }
  if (equipment === 'chair') {
    return <PiArmchair />
  }
  if (equipment === 'lamp') {
    return <BsLamp />
  }
  if (equipment === 'computer') {
    return <FaComputer />
  }
  if (equipment === 'monitor') {
    return <MdOutlineScreenshotMonitor />
  }
  if (equipment === 'keyboard') {
    return <FaRegKeyboard />
  }
  if (equipment === 'mouse') {
    return <PiMouseMiddleClickDuotone />
  }
  if (equipment === 'printer') {
    return <BsPrinter />
  }
  if (equipment === 'bookshelf') {
    return <GiBookshelf />
  }
  if (equipment === 'cabinet') {
    return <BiCabinet />
  }
  if (equipment === 'whiteboard') {
    return <LiaChalkboardTeacherSolid />
  }
  if (equipment === 'projector') {
    return <LuProjector />
  }
  if (equipment === 'telephone') {
    return <BsTelephone />
  }
  if (equipment === 'fan') {
    return <PiFanDuotone />
  }
  if (equipment === 'air conditioner') {
    return <TbAirConditioning />
  }
  if (equipment === 'heater') {
    return <PiThermometerHotDuotone />
  }
  if (equipment === 'rug') {
    return <PiRugDuotone />
  }
  if (equipment === 'sofa') {
    return <TbSofa />
  }
  if (equipment === 'coffee machine') {
    return <MdCoffeeMaker />
  }
  if (equipment === 'television') {
    return <PiTelevisionDuotone />
  }
  return null
}

export default EquipmentImage
