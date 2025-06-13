import {
  ProgramItem,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram,
} from 'planby'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'

export const Program = ({ program, ...rest }: ProgramItem) => {
  const { styles, formatTime, set12HoursTimeFormat, isLive, isMinWidth } =
    useProgram({
      program,
      ...rest,
    })

  const { data } = program
  const { image, title, since, till, description } = data

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase()
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ProgramBox
          width={styles.width}
          style={styles.position}
          className='cursor-pointer'
        >
          <ProgramContent width={styles.width} isLive={isLive}>
            <ProgramFlex>
              {isLive && isMinWidth && (
                <ProgramImage src={image} alt='Preview' />
              )}
              <ProgramStack>
                <ProgramTitle>{title}</ProgramTitle>
                <ProgramText>
                  {sinceTime} - {tillTime}
                </ProgramText>
              </ProgramStack>
            </ProgramFlex>
          </ProgramContent>
        </ProgramBox>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-[9999]' />
        <Dialog.Content className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-900 p-6 rounded-lg max-w-xl w-full mx-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] z-[10000]'>
          <div className='flex justify-between items-start mb-4'>
            <Dialog.Title className='text-xl font-bold text-white'>
              {title}
            </Dialog.Title>
            <Dialog.Close className='text-white hover:text-gray-300'>
              ✕
            </Dialog.Close>
          </div>

          {image && (
            <Image
              src={image}
              alt={title}
              className='w-full object-cover rounded mb-4'
              width={200}
              height={200}
            />
          )}

          <div className='text-white space-y-2'>
            <p className='text-gray-300'>
              {sinceTime} - {tillTime}
            </p>
            {description && <p className='text-gray-300'>{description}</p>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
