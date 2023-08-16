import { useAccount } from "@lib/context/account-context"
import { Customer } from "@medusajs/medusa"
import Input from "@modules/common/components/input"
import { useUpdateMe } from "medusa-react"
import React, { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import AccountInfo from "../account-info"
import { REGEX_INTERNATION_PHONE } from "@lib/constants"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type UpdateCustomerPhoneFormData = {
  phone: string
}

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, touchedFields, isDirty },
  } = useForm<UpdateCustomerPhoneFormData>({
    defaultValues: {
      phone: customer.phone,
    },
  })

  const { refetchCustomer } = useAccount()

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe()

  useEffect(() => {
    reset({
      phone: customer.phone,
    })
  }, [customer, reset])

  const phone = useWatch({
    control,
    name: "phone",
  })

  const updatePhone = (data: UpdateCustomerPhoneFormData) => {
    return update(
      {
        id: customer.id,
        ...data,
      },
      {
        onSuccess: () => {
          refetchCustomer()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(updatePhone)} className="w-full">
      <AccountInfo
        label="Phone"
        currentInfo={`${customer.phone}`}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        clearState={clearState}
        isDirty={isDirty}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Phone"
            {...register("phone", {
              required: 'Enter your phone, please',
              pattern: {
                value: REGEX_INTERNATION_PHONE,
                message: 'Phone is invalid!'
              }
            })}
            defaultValue={phone}
            errors={errors}
            touched={touchedFields}
            required
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePhone
