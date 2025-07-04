/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from "formik";
import { PlusIcon, TrashBinIcon } from "../../icons";
import ComponentCard from "../common/ComponentCard";
import TextEditor from "../common/TextEditor";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";

interface IFormik {
  id: string;
  image: [];
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  peDescription: string;
  enDescription: string;
  ruDescription: string;
  peTableCols: { field: string }[];
  enTableCols: { field: string }[];
  ruTableCols: { field: string }[];
  peTableRows: any[];
  enTableRows: any[];
  ruTableRows: any[];
}

interface Props {
  formik: any;
  contentFormik: any;
  formikTemplateThreePage: FormikProps<IFormik>;
  onStep: (step: number) => void;
  onFile: (image: File[]) => void;
  isLoading: boolean;
  step: number;
}

function TemplteThree({
  formik,
  contentFormik,
  formikTemplateThreePage,
  onStep,
  onFile,
  isLoading,
  step,
}: Props) {
  const handleAddColumn = () => {
    const peCpTableCol = [...formikTemplateThreePage.values.peTableCols];
    const enCpTableCol = [...formikTemplateThreePage.values.enTableCols];
    const ruCpTableCol = [...formikTemplateThreePage.values.ruTableCols];

    peCpTableCol.push({ field: "" });
    enCpTableCol.push({ field: "" });
    ruCpTableCol.push({ field: "" });

    formikTemplateThreePage.setFieldValue("peTableCols", peCpTableCol);
    formikTemplateThreePage.setFieldValue("enTableCols", enCpTableCol);
    formikTemplateThreePage.setFieldValue("ruTableCols", ruCpTableCol);
  };

  const handleAddRow = (i: number) => {
    const peCpTableRow = [...formikTemplateThreePage.values.peTableRows];
    const enCpTableRow = [...formikTemplateThreePage.values.enTableRows];
    const ruCpTableRow = [...formikTemplateThreePage.values.ruTableRows];

    //   const peCpTableCol = [...formikTemplateThreePage.values.peTableCols];
    // const enCpTableCol = [...formikTemplateThreePage.values.enTableCols];
    // const ruCpTableCol = [...formikTemplateThreePage.values.ruTableCols];

    // if(peCpTableCol?.length) peCpTableRow.push({peCpTableCol[i]?.field : ""});
    // enCpTableRow.push({});
    // ruCpTableRow.push({});

    formikTemplateThreePage.setFieldValue("peTableRows", peCpTableRow);
    formikTemplateThreePage.setFieldValue("enTableRows", enCpTableRow);
    formikTemplateThreePage.setFieldValue("ruTableRows", ruCpTableRow);
  };

  return (
    <>
      <ComponentCard title="عنوان صفحه" className="mt-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="pe-input">عنوان فارسی</Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="عنوان فارسی را وارد کنید"
              error={contentFormik.errors.peTitle ? true : false}
              {...contentFormik.getFieldProps("peTitle")}
            />
            {contentFormik.errors.peTitle && contentFormik.touched.peTitle && (
              <span className="text-sm text-error-500">
                {typeof contentFormik.errors.peTitle === "string" &&
                  contentFormik.errors.peTitle}
              </span>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="en-input">عنوان انگلیسی</Label>
            <Input
              type="text"
              id="en-input"
              placeholder="عنوان انگلیسی را وارد کنید"
              error={contentFormik.errors.enTitle ? true : false}
              {...contentFormik.getFieldProps("enTitle")}
            />
            {contentFormik.errors.enTitle && contentFormik.touched.enTitle && (
              <span className="text-sm text-error-500">
                {typeof contentFormik.errors.enTitle === "string" &&
                  contentFormik.errors.enTitle}
              </span>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="ru-input">عنوان روسی</Label>
            <Input
              type="text"
              id="ru-input"
              placeholder="عنوان روسی را وارد کنید"
              error={contentFormik.errors.ruTitle ? true : false}
              {...contentFormik.getFieldProps("ruTitle")}
            />
            {contentFormik.errors.ruTitle && contentFormik.touched.ruTitle && (
              <span className="text-sm text-error-500">
                {typeof contentFormik.errors.ruTitle === "string" &&
                  contentFormik.errors.ruTitle}
              </span>
            )}
          </div>
        </div>
      </ComponentCard>
      <ComponentCard title="توضیحات صفحه" className="mt-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="pe-input">توضیحات فارسی</Label>
            <TextArea
              formik={contentFormik}
              name="peDescription"
              placeholder="توضیحات فارسی را وارد کنید"
              error={contentFormik.errors.peDescription ? true : false}
            />
            {contentFormik.errors.peDescription &&
              contentFormik.touched.peDescription && (
                <span className="text-sm text-error-500">
                  {typeof contentFormik.errors.peDescription === "string" &&
                    contentFormik.errors.peDescription}
                </span>
              )}
          </div>
          <div className="flex-1">
            <Label htmlFor="en-input">توضیحات انگلیسی</Label>
            <TextArea
              formik={contentFormik}
              name="enDescription"
              placeholder="توضیحات انگلیسی را وارد کنید"
              error={contentFormik.errors.enDescription ? true : false}
            />
            {contentFormik.errors.enDescription &&
              contentFormik.touched.enDescription && (
                <span className="text-sm text-error-500">
                  {typeof contentFormik.errors.enDescription === "string" &&
                    contentFormik.errors.enDescription}
                </span>
              )}
          </div>
          <div className="flex-1">
            <Label htmlFor="ru-input">توضیحات روسی</Label>
            <TextArea
              formik={contentFormik}
              name="ruDescription"
              placeholder="توضیحات روسی را وارد کنید"
              error={contentFormik.errors.ruDescription ? true : false}
            />
            {contentFormik.errors.ruDescription &&
              contentFormik.touched.ruDescription && (
                <span className="text-sm text-error-500">
                  {typeof contentFormik.errors.ruDescription === "string" &&
                    contentFormik.errors.ruDescription}
                </span>
              )}
          </div>
        </div>
      </ComponentCard>
      {/* <ComponentCard title="ستون های جدول" className="mt-4 relative">
        <Button
          className="absolute top-2 left-2"
          endIcon={<PlusIcon />}
          onClick={handleAddColumn}
        >
          افزودن ستون
        </Button>

        {formikTemplateThreePage?.values?.peTableCols?.map(
          (item: { field: string }, index: number) => (
            <div key={index} className="flex flex-col md:flex-row gap-4">
              <span className="dark:text-white ">{index + 1}</span>
              <div className="flex-1">
                <Label htmlFor="pe-input">عنوان ستون جدول (فارسی)</Label>
                <Input
                  type="text"
                  id="pe-input"
                  placeholder="عنوان ستون جدول (فارسی) را وارد کنید"
                  error={
                    formikTemplateThreePage?.errors?.peTableCols?.length &&
                    formikTemplateThreePage?.errors?.peTableCols[index]?.field
                      ? true
                      : false
                  }
                  {...formikTemplateThreePage?.getFieldProps(
                    `peTableCols[${index}].field`
                  )}
                />
                {formikTemplateThreePage?.errors?.peTableCols?.length &&
                  formikTemplateThreePage?.touched?.peTableCols?.length &&
                  formikTemplateThreePage?.errors.peTableCols[index]?.field &&
                  formikTemplateThreePage?.touched.peTableCols[index]
                    ?.field && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateThreePage?.errors.peTableCols[index]
                        ?.field === "string" &&
                        formikTemplateThreePage?.errors.peTableCols[index]
                          ?.field}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">عنوان ستون جدول (انگلیسی)</Label>
                <Input
                  type="text"
                  id="en-input"
                  placeholder="عنوان ستون جدول (انگلیسی) را وارد کنید"
                  error={
                    formikTemplateThreePage?.errors?.enTableCols?.length &&
                    formikTemplateThreePage?.errors?.enTableCols[index]?.field
                      ? true
                      : false
                  }
                  {...formikTemplateThreePage?.getFieldProps(
                    `enTableCols[${index}].field`
                  )}
                />
                {formikTemplateThreePage?.errors?.enTableCols?.length &&
                  formikTemplateThreePage?.touched?.enTableCols?.length &&
                  formikTemplateThreePage?.errors.enTableCols[index]?.field &&
                  formikTemplateThreePage?.touched.enTableCols[index]
                    ?.field && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateThreePage?.errors.enTableCols[index]
                        ?.field === "string" &&
                        formikTemplateThreePage?.errors.enTableCols[index]
                          ?.field}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">عنوان ستون جدول (روسی)</Label>
                <Input
                  type="text"
                  id="ru-input"
                  placeholder="عنوان ستون جدول (روسی) را وارد کنید"
                  error={
                    formikTemplateThreePage?.errors?.ruTableCols?.length &&
                    formikTemplateThreePage?.errors?.ruTableCols[index]?.field
                      ? true
                      : false
                  }
                  {...formikTemplateThreePage?.getFieldProps(
                    `ruTableCols[${index}].field`
                  )}
                />
                {formikTemplateThreePage?.errors?.ruTableCols?.length &&
                  formikTemplateThreePage?.touched?.ruTableCols?.length &&
                  formikTemplateThreePage?.errors.ruTableCols[index]?.field &&
                  formikTemplateThreePage?.touched.ruTableCols[index]
                    ?.field && (
                    <span className="text-sm text-error-500">
                      {typeof formikTemplateThreePage?.errors.ruTableCols[index]
                        ?.field === "string" &&
                        formikTemplateThreePage?.errors.ruTableCols[index]
                          ?.field}
                    </span>
                  )}
              </div>
              <Button
                size="sm"
                className="h-8 bg-red-500 hover:bg-red-800 max-w-8"
                onClick={() => {
                  const cpTableCols = [
                    ...formikTemplateThreePage.values.peTableCols,
                  ];
                  const filteredCols = cpTableCols.filter(
                    (f, i) => i !== index
                  );

                  formikTemplateThreePage.setFieldValue(
                    "peTableCols",
                    filteredCols
                  );
                  formikTemplateThreePage.setFieldValue(
                    "enTableCols",
                    filteredCols
                  );
                  formikTemplateThreePage.setFieldValue(
                    "ruTableCols",
                    filteredCols
                  );
                }}
              >
                <TrashBinIcon />
              </Button>
            </div>
          )
        )}
      </ComponentCard>
      {formikTemplateThreePage?.values?.peTableCols?.length > 0 &&
        formikTemplateThreePage?.values?.peTableCols?.map(
          (item: any, i: number) => (
            <ComponentCard
              key={i}
              title={` ردیف ستون (${i + 1})`}
              className="mt-4 relative"
            >
              <Button
                className="absolute top-2 left-2"
                endIcon={<PlusIcon />}
                onClick={() => {
                  if (
                    formikTemplateThreePage?.values?.peTableCols[i]?.field &&
                    formikTemplateThreePage?.values?.enTableCols[i]?.field &&
                    formikTemplateThreePage?.values?.ruTableCols[i]?.field
                  ) {
                    handleAddRow(i);
                  } else {
                    toast.error("لطفا ابتدا  عنوان ستون جدول را وارد کنید");
                  }
                }}
              >
                افزودن ردیف
              </Button>

              {formikTemplateThreePage?.values?.peTableRows?.map(
                (item: { field: string }, index: number) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4">
                    <span className="dark:text-white ">{index + 1}</span>
                    <div className="flex-1">
                      <Label htmlFor="pe-input">
                        محتوای ستون {i + 1} (فارسی)
                      </Label>
                      <Input
                        type="text"
                        id="pe-input"
                        placeholder={`محتوای ستون ${
                          i + 1
                        } (فارسی) را وارد کنید`}
                        error={
                          formikTemplateThreePage?.errors?.peTableCols
                            ?.length &&
                          formikTemplateThreePage?.errors?.peTableCols[index]
                            ?.field
                            ? true
                            : false
                        }
                        disabled={
                          formikTemplateThreePage?.values?.peTableCols[index]
                            ?.field?.lenght < 0
                        }
                        {...formikTemplateThreePage?.getFieldProps(
                          `peTableCols[${index}].field`
                        )}
                      />
                      {formikTemplateThreePage?.errors?.peTableCols?.length &&
                        formikTemplateThreePage?.touched?.peTableCols?.length &&
                        formikTemplateThreePage?.errors.peTableCols[index]
                          ?.field &&
                        formikTemplateThreePage?.touched.peTableCols[index]
                          ?.field && (
                          <span className="text-sm text-error-500">
                            {typeof formikTemplateThreePage?.errors.peTableCols[
                              index
                            ]?.field === "string" &&
                              formikTemplateThreePage?.errors.peTableCols[index]
                                ?.field}
                          </span>
                        )}
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="pe-input">
                        محتوای ستون {i + 1} (انگلیسی)
                      </Label>

                      <Input
                        type="text"
                        id="en-input"
                        placeholder={`محتوای ستون ${
                          i + 1
                        } (انگلیسی) را وارد کنید`}
                        error={
                          formikTemplateThreePage?.errors?.enTableCols
                            ?.length &&
                          formikTemplateThreePage?.errors?.enTableCols[index]
                            ?.field
                            ? true
                            : false
                        }
                        {...formikTemplateThreePage?.getFieldProps(
                          `enTableCols[${index}].field`
                        )}
                      />
                      {formikTemplateThreePage?.errors?.enTableCols?.length &&
                        formikTemplateThreePage?.touched?.enTableCols?.length &&
                        formikTemplateThreePage?.errors.enTableCols[index]
                          ?.field &&
                        formikTemplateThreePage?.touched.enTableCols[index]
                          ?.field && (
                          <span className="text-sm text-error-500">
                            {typeof formikTemplateThreePage?.errors.enTableCols[
                              index
                            ]?.field === "string" &&
                              formikTemplateThreePage?.errors.enTableCols[index]
                                ?.field}
                          </span>
                        )}
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="ru-input">عنوان ردیف جدول (روسی)</Label>
                      <Input
                        type="text"
                        id="ru-input"
                        placeholder="عنوان ردیف جدول (روسی) را وارد کنید"
                        error={
                          formikTemplateThreePage?.errors?.ruTableCols
                            ?.length &&
                          formikTemplateThreePage?.errors?.ruTableCols[index]
                            ?.field
                            ? true
                            : false
                        }
                        {...formikTemplateThreePage?.getFieldProps(
                          `ruTableCols[${index}].field`
                        )}
                      />
                      {formikTemplateThreePage?.errors?.ruTableCols?.length &&
                        formikTemplateThreePage?.touched?.ruTableCols?.length &&
                        formikTemplateThreePage?.errors.ruTableCols[index]
                          ?.field &&
                        formikTemplateThreePage?.touched.ruTableCols[index]
                          ?.field && (
                          <span className="text-sm text-error-500">
                            {typeof formikTemplateThreePage?.errors.ruTableCols[
                              index
                            ]?.field === "string" &&
                              formikTemplateThreePage?.errors.ruTableCols[index]
                                ?.field}
                          </span>
                        )}
                    </div>
                    <Button
                      size="sm"
                      className="h-8 bg-red-500 hover:bg-red-800 max-w-8"
                      onClick={() => {
                        const cpTableCols = [
                          ...formikTemplateThreePage.values.peTableRows,
                        ];
                        const filteredCols = cpTableCols.filter(
                          (f, i) => i !== index
                        );

                        formikTemplateThreePage.setFieldValue(
                          "peTableRows",
                          filteredCols
                        );
                        formikTemplateThreePage.setFieldValue(
                          "enTableRows",
                          filteredCols
                        );
                        formikTemplateThreePage.setFieldValue(
                          "ruTableRows",
                          filteredCols
                        );
                      }}
                    >
                      <TrashBinIcon />
                    </Button>
                  </div>
                )
              )}
            </ComponentCard>
          )
        )} */}
      <div className="mt-4 flex gap-2">
        <Button
          type={formik?.values?.hasSubPage ? "button" : "submit"}
          onClick={() => {
            if (formik?.values?.hasSubPage) {
              onStep(step + 1);
            }
          }}
          isLoading={isLoading}
        >
          {formik?.values?.hasSubPage ? "بعدی" : "تایید و ساخت صفحه"}
        </Button>
        <Button
          onClick={() => {
            onStep(step - 1);
          }}
          variant="outline"
        >
          قبلی
        </Button>
      </div>
    </>
  );
}

export default TemplteThree;
