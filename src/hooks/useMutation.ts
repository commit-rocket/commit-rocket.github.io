import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import { UseFormHandleSubmit, FieldValues } from "react-hook-form";

export type MutationHandler<TResponse> = Dispatch<SetStateAction<TResponse | null>>;

const useFormMutation = <TResponse extends {}, TFieldValues extends FieldValues = FieldValues, THandleSubmit extends UseFormHandleSubmit<TFieldValues> = UseFormHandleSubmit<TFieldValues>>(
  handleSubmit: THandleSubmit,
  handler: (setResponse: MutationHandler<TResponse>, data: TFieldValues, event?: React.BaseSyntheticEvent) => unknown | Promise<unknown>
) => {

  const [response, setResponse] = useState<null | TResponse>(null);
  const [loading, setLoading] = useState(false);

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const handleSubmitRef = useRef<THandleSubmit>(handleSubmit);
  handleSubmitRef.current = handleSubmit;

  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const mutate = useMemo(() => handleSubmitRef.current(async (...vals) => {
    if (loadingRef.current) return;
    setLoading(true);

    await handlerRef.current(
      (...setterValues) => {
        setResponse(...setterValues);
        setLoading(false);
      },
      ...vals
    );
  }), []);

  return [mutate, response, loading] as const;
};

export default useFormMutation;