import { FulfillmentStatus, OrderStatus as OrderStatusEnum, PaymentStatus } from "@medusajs/medusa";
import Cancel from "@modules/common/icons/cancel";
import Captured from "@modules/common/icons/captured";
import CheckCircle from "@modules/common/icons/check-circle";
import Loader from "@modules/common/icons/loader";
import Truck from "@modules/common/icons/truck";
import TruckV2 from "@modules/common/icons/truck-v2";
import clsx from "clsx";


type OrderStatusProps = {
  status: OrderStatusEnum;
  fulfillStatus: FulfillmentStatus;
  paymentStatus: PaymentStatus;
  isShowIcon?: boolean;
} & React.HTMLAttributes<HTMLDivElement>


const TextClasses: { [k in keyof typeof StatusIcons]?: string } = {
  delivery: 'text-orange-500',
  "partially delivery": 'text-yellow-500',
  shipped: 'text-green-400',
  completed: 'text-green-500',
  confirmed: 'text-green-500',
  canceled: 'text-rose-500',
  awaiting: 'text-yellow-500'
}
const StatusClasses: { [k in keyof typeof StatusIcons]?: string } = {
  delivery: 'bg-orange-300',
  "partially delivery": 'bg-yellow-300',
  shipped: 'bg-green-300',
  completed: 'bg-green-300',
  confirmed: 'bg-green-300',
  canceled: 'bg-rose-500',
  awaiting: 'bg-yellow-300'
}

const StatusName: Record<string, string> = {
  pending: 'awaiting',
}

const StatusIcons: Record<string, JSX.Element> = {
  delivery: <Truck className="text-orange-300" />,
  "partially delivery": <Truck className="text-orange-300" />,
  shipped: <TruckV2 className="text-green-400" />,
  completed: <CheckCircle className="text-green-400" size="22" />,
  confirmed: <Captured className="text-green-400" />,
  canceled: <Cancel className="text-rose-500" size="22" />,
  awaiting: <Loader className="text-yellow-400" />,

}

const getStatusName = (status: OrderStatusEnum, fulfillStatus: FulfillmentStatus, paymentStatus: PaymentStatus) => {
  if (status !== 'pending') {
    return status
  }

  if (fulfillStatus === 'fulfilled') {
    return 'delivery'
  }

  if (fulfillStatus === 'partially_fulfilled') {
    return 'partially delivery'
  }

  if (fulfillStatus === 'shipped') {
    return 'shipped'
  }

  if (paymentStatus === 'captured') {
    return 'confirmed'
  }

  return 'awaiting'
}

const OrderStatus = ({ status, fulfillStatus, paymentStatus, isShowIcon = true, className, ...divProps }: OrderStatusProps) => {
  console.log({ status, fulfillStatus, paymentStatus })
  const _status = getStatusName(status, fulfillStatus, paymentStatus);
  return (
    <div className={`ml-auto max-w-min text-[12px] text-slate-500 capitalize absolute right-5 top-5 ${className}`}>
      {isShowIcon &&
        <div className={`absolute rounded-full translate-x-[-130%] translate-y-[-50%] top-1/2 `} {...divProps}>
          {StatusIcons[_status]}
        </div>
      }
      <p className={clsx('whitespace-nowrap', { [TextClasses[_status] as string]: !isShowIcon })}>{StatusName[_status] ?? _status}</p>
    </div>
  )
}

export default OrderStatus