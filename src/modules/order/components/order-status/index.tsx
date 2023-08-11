import { FulfillmentStatus, PaymentStatus, OrderStatus as OrderStatusEnum } from "@medusajs/medusa";
import Captured from "@modules/common/icons/captured";
import Check from "@modules/common/icons/check";
import FastDelivery from "@modules/common/icons/fast-delivery";
import Spinner from "@modules/common/icons/spinner";
import Truck from "@modules/common/icons/truck";
import X from "@modules/common/icons/x";
import clsx from "clsx";


type OrderStatusProps = {
  status: OrderStatusEnum;
  fulfillStatus: FulfillmentStatus;
  paymentStatus: PaymentStatus;
  isShowIcon?: boolean;
} & React.HTMLAttributes<HTMLDivElement>


const TextClasses: { [k in keyof typeof StatusIcons]?: string } = {
  delivery: 'text-yellow-500',
  "partially delivery": 'text-yellow-500',
  shipped: 'text-yellow-500',
  completed: 'text-green-500',
  confirmed: 'text-green-500',
  canceled: 'text-rose-500',
  awaiting: 'text-yellow-500'
}
const StatusClasses: { [k in keyof typeof StatusIcons]?: string } = {
  delivery: 'bg-yellow-300',
  "partially delivery": 'bg-yellow-300',
  shipped: 'bg-yellow-300',
  completed: 'bg-green-300',
  confirmed: 'bg-green-300',
  canceled: 'bg-rose-500',
  awaiting: 'bg-yellow-300'
}

const StatusName: Record<string, string> = {
  pending: 'awaiting',
}

const StatusIcons: Record<string, JSX.Element> = {
  delivery: <Truck color="white" />,
  "partially delivery": <Truck color="white" />,
  shipped: <FastDelivery color="white" />,
  completed: <Check color="white" />,
  confirmed: <Captured color="white" />,
  canceled: <X color="white" />,
  awaiting: <Spinner color="white" />,

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

  if (fulfillStatus === 'shipped' && paymentStatus !== 'captured') {
    return 'shipped'
  }

  if (paymentStatus === 'captured') {
    return 'confirmed'
  }

  return 'awaiting'
}

const OrderStatus = ({ status, fulfillStatus, paymentStatus, isShowIcon = true, ...divProps }: OrderStatusProps) => {
  const _status = getStatusName(status, fulfillStatus, paymentStatus);
  const { className, ...restProps } = divProps
  return (
    <div className={`ml-auto max-w-min text-[12px] text-slate-500 capitalize absolute right-5 top-5 ${className}`}>
      {isShowIcon &&
        <div className={`${StatusClasses[_status]} absolute rounded-full translate-x-[-120%] translate-y-[-50%] top-1/2 p-[4px]`} {...restProps}>
          {StatusIcons[_status]}
        </div>
      }
      <span className={clsx('font-semibold', { [TextClasses[_status] as string]: !isShowIcon })}>{StatusName[_status] ?? _status}</span>
    </div>
  )
}

export default OrderStatus