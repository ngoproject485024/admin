import { useFormik } from "formik";
import ComponentCard from "../common/ComponentCard";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getSingleAdmin, updateAdmin } from "../../server/admin";
import { adminSchema } from "../../utils/validation";

function UpdateAdmin({
  isOpen,
  onClose,
  refetch,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  id: string;
}) {
  const { data } = useQuery({
    queryKey: ["getSingleAdmin" , id],
    queryFn: () => getSingleAdmin(id),
  });

  const mutation = useMutation({
    mutationKey: ["updateAdmin"],
    mutationFn: ({ id, values }: { id: string; values: any }) =>
      updateAdmin(id, values),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success("ادمین با موفقیت به روزرسانی شد");
        formik.resetForm();
        onClose();
        refetch();
      } else {
        toast.error("ادمین به روزرسانی نشد ، لطفا دوباره امتحان کنید");
        onClose();
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: data?.data?.firstName,
      lastName: data?.data?.lastName,
      userName: data?.data?.userName,
      password: "",
    },
    enableReinitialize: true,
    validationSchema: adminSchema,
    onSubmit: (values: any) => {
      mutation.mutate({ id, values });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="font-bold text-lg text-center w-full mb-8">
        به روزرسانی ادمین
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <ComponentCard title="" className="my-2">
          <div className="flex gap-4">
            <div>
              <Label htmlFor="pe-input">نام</Label>
              <Input
                type="text"
                id="pe-input"
                placeholder="نام را وارد کنید"
                error={formik.errors.firstName ? true : false}
                {...formik.getFieldProps("firstName")}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.firstName === "string" &&
                    formik.errors.firstName}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="en-input">نام خانوادگی</Label>
              <Input
                type="text"
                id="en-input"
                placeholder="نام خانوادگی را وارد کنید"
                error={formik.errors.lastName ? true : false}
                {...formik.getFieldProps("lastName")}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.lastName === "string" &&
                    formik.errors.lastName}
                </span>
              )}
            </div>
          </div>
        </ComponentCard>
        <ComponentCard title="" className="my-2">
          <div className="flex gap-4">
            <div>
              <Label htmlFor="pe-input">نام کاربری</Label>
              <Input
                type="text"
                id="pe-input"
                placeholder="نام کاربری را وارد کنید"
                error={formik.errors.userName ? true : false}
                {...formik.getFieldProps("userName")}
              />
              {formik.errors.userName && formik.touched.userName && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.userName === "string" &&
                    formik.errors.userName}
                </span>
              )}
            </div>
          </div>
        </ComponentCard>
        <ComponentCard title="" className="my-2">
          <div className="flex gap-4">
            <div>
              <Label htmlFor="pe-input">رمز عبور</Label>
              <Input
                type="text"
                id="pe-input"
                placeholder="رمز عبور را وارد کنید"
                error={formik.errors.password ? true : false}
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="text-sm text-error-500">
                  {typeof formik.errors.password === "string" &&
                    formik.errors.password}
                </span>
              )}
            </div>
          </div>
        </ComponentCard>

        <div className="flex gap-4 p-4 m-4">
          <Button type="submit" isLoading={mutation.isPending}>
            ثبت
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              formik.resetForm();
              onClose();
            }}
          >
            انصراف
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateAdmin;
