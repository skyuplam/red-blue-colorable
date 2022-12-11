import type React from "react";
import { useState, useLayoutEffect, useRef } from "react";

type TextareaValue = string | number | readonly string[];
interface Props {
  onChange: (value: TextareaValue) => void;
}

export const Textarea: React.FC<
  Omit<React.ComponentProps<"textarea">, "id" | "onChange"> & Props
> = (props) => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(props.value);

  useLayoutEffect(() => {
    const autoResize = (evt: HTMLElementEventMap["input"]) => {
      if (evt.target instanceof HTMLTextAreaElement) {
        evt.target.style.height = "auto";
        evt.target.style.height = evt.target.scrollHeight + "px";
      }
    };
    textareaEl.current?.addEventListener("input", autoResize, false);
  }, []);

  const handleOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const { value } = event.target;
    setValue(value);
    if (value !== undefined) {
      props.onChange(value);
    }
  };

  return (
    <div className="container">
      <label htmlFor="input-label">
        Input some paths to know if provided is a red-blue colorable.
      </label>
      <textarea
        id="inputs"
        ref={textareaEl}
        {...props}
        value={value}
        onChange={handleOnChange}
        className={["textarea", props.className].filter(Boolean).join(" ")}
      />
    </div>
  );
};
