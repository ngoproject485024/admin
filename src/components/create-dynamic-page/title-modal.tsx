import { useEffect, useState } from "react";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import toast from "react-hot-toast";

interface Props {
  formik: any;
  isOpen: boolean;
  onClose: () => void;
  update?: any;
  id?: number;
}

function TitleModal({ isOpen, onClose, formik, update, id }: Props) {
  const [peValue, setPeValue] = useState<string>("");
  const [enValue, setEnValue] = useState<string>("");
  const [ruValue, setRuValue] = useState<string>("");

  useEffect(() => {
    if (id !== 0) {
      setPeValue(
        formik?.values?.peContent?.find((f: any) => f.id === id)?.content || ""
      );
      setEnValue(
        formik?.values?.enContent?.find((f: any) => f.id === id)?.content || ""
      );
      setRuValue(
        formik?.values?.ruContent?.find((f: any) => f.id === id)?.content || ""
      );
    } else {
      setPeValue("");
      setEnValue("");
      setRuValue("");
    }
  }, [
    id,
    formik?.values?.peContent,
    formik?.values?.enContent,
    formik?.values?.ruContent,
  ]);

  const handleSubmit = () => {
    if (!peValue || !enValue || !ruValue) {
      // Handle form submission
      toast.error("لطفا تمام فیلدها را پر کنید");
      return;
    }

    if (id !== 0) {
      const cpPeContent = [...formik.values.peContent];
      const cpEnContent = [...formik.values.enContent];
      const cpRuContent = [...formik.values.ruContent];

      const updatePeContent = cpPeContent.filter((f) => f.id === update.id);

      if (updatePeContent.length > 0) {
        updatePeContent[0].content = peValue;
        formik.setFieldValue("peContent", cpPeContent);
      }

      const updateEnContent = cpEnContent.filter((f) => f.id === update.id);

      if (updateEnContent.length > 0) {
        updateEnContent[0].content = enValue;
        formik.setFieldValue("enContent", cpEnContent);
      }

      const updateRuContent = cpRuContent.filter((f) => f.id === update.id);

      if (updateRuContent.length > 0) {
        updateRuContent[0].content = ruValue;
        formik.setFieldValue("ruContent", cpRuContent);
      }
    } else {
      const id = Math.random() * 10000;

      formik.setFieldValue("peContent", [
        ...formik.values.peContent,
        {
          id,
          title: "title",
          content: peValue,
        },
      ]);
      formik.setFieldValue("enContent", [
        ...formik.values.enContent,
        {
          id,
          title: "title",
          content: enValue,
        },
      ]);
      formik.setFieldValue("ruContent", [
        ...formik.values.ruContent,
        {
          id,
          title: "title",
          content: ruValue,
        },
      ]);
    }

    setPeValue("");
    setEnValue("");
    setRuValue("");

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      <h1 className="dark:text-white font-bold text-xl">عنوان صفحه</h1>
      <div className="flex flex-col gap-2 mt-4">
        <Input
          type="text"
          value={peValue}
          onChange={(e) => setPeValue(e.target.value)}
          placeholder="عنوان  فارسی را وارد کنید"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          value={enValue}
          onChange={(e) => setEnValue(e.target.value)}
          placeholder="عنوان انگلیسی را وارد کنید"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          value={ruValue}
          onChange={(e) => setRuValue(e.target.value)}
          placeholder="عنوان روسی را وارد کنید"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-5">
        <Button onClick={handleSubmit}>ذخیره</Button>
      </div>
    </Modal>
  );
}

export default TitleModal;
