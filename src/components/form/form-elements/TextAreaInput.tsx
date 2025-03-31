import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

interface ITextAreaInput {
  title?: string | undefined;
}

export default function TextAreaInput({ title }: ITextAreaInput) {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");

  return (
    <ComponentCard title={title ? title : ""}>
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <Label>توضیحات</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>

        {/* Disabled TextArea */}
        {/* <div>
          <Label>Description</Label>
          <TextArea rows={6} disabled />
        </div> */}

        {/* Error TextArea */}
        {/* <div>
          <Label>Description</Label>
          <TextArea
            rows={6}
            value={messageTwo}
            error
            onChange={(value) => setMessageTwo(value)}
            hint="Please enter a valid message."
          />
        </div> */}
      </div>
    </ComponentCard>
  );
}
