import { useAccount } from "@lib/context/account-context"
import { Customer } from "@medusajs/medusa"
import Input from "@modules/common/components/input"
import { useUpdateMe } from "medusa-react"
import React, { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import AccountInfo from "../account-info"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type UpdateCustomerNameFormData = {
  first_name: string
  last_name: string
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, touchedFields, isDirty },
  } = useForm<UpdateCustomerNameFormData>({
    defaultValues: {
      first_name: customer.first_name,
      last_name: customer.last_name,
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
      first_name: customer.first_name,
      last_name: customer.last_name,
    })
  }, [customer, reset])

  const firstName = useWatch({
    control,
    name: "first_name",
  })
  const lastName = useWatch({
    control,
    name: "last_name",
  })

  const updateName = (data: UpdateCustomerNameFormData) => {
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
    <form onSubmit={handleSubmit(updateName)} className="w-full">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        clearState={clearState}
        isDirty={isDirty}
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="First name"
            {...register("first_name", {
              required: 'Enter first name, please!',
            })}
            defaultValue={firstName}
            touched={touchedFields}
            errors={errors}
            required
          />
          <Input
            label="Last name"
            {...register("last_name", {
              required: 'Enter last name, please!',
            })}
            defaultValue={lastName}
            touched={touchedFields}
            errors={errors}
            required
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
