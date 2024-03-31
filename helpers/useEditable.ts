import {
  ElementRef,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

type UseEditableOptions = {
  initialEditingState?: boolean;
  onEditStart?: () => void;
  onEditEnd?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  selectOnEnable?: boolean;
};

type UseEditableReturn = {
  isEditing: boolean;
  ref: RefObject<ElementRef<'input'>>;
  enableEditing: () => void;
  disableEditing: () => void;
};

export const useEditable = ({
  initialEditingState = false,
  onEditStart,
  onEditEnd,
  onKeyDown = () => {},
  selectOnEnable = false,
}: UseEditableOptions): UseEditableReturn => {
  const [isEditing, setIsEditing] = useState(initialEditingState);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enableEditing = useCallback(() => {
    setIsEditing(true);
    onEditStart && onEditStart();
    setTimeout(() => {
      inputRef.current?.focus();
      if (
        selectOnEnable &&
        inputRef.current?.contains(document.activeElement)
      ) {
        inputRef.current?.select();
      }
    });
  }, [onEditStart, selectOnEnable]);

  const disableEditing = useCallback(() => {
    setIsEditing(false);
    onEditEnd && onEditEnd();
  }, [onEditEnd]);

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(inputRef, disableEditing);

  return useMemo(
    () => ({
      isEditing,
      ref: inputRef,
      enableEditing,
      disableEditing,
    }),
    [isEditing, inputRef, enableEditing, disableEditing]
  );
};
