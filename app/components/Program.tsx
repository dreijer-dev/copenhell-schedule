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
import { stages } from '@/app/fixtures/stages'

// Map UUID to stage name
const uuidToStage: Record<string, string> = Object.fromEntries(
  stages.map(stage => [stage.uuid, stage.name])
)

export const Program = ({ program, ...rest }: ProgramItem) => {
  const { styles, formatTime, set12HoursTimeFormat, isLive, isMinWidth } =
    useProgram({
      program,
      ...rest,
    })

  const { data } = program
  const { image, title, since, till, description, channelUuid } = data

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase()
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase()
  const stageName = uuidToStage[channelUuid] || ''

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
        <Dialog.Content className=' fixed left-[50%] overflow-y-auto h-full max-h-fit top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-900 p-6 rounded-lg max-w-xl w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] z-[10000]'>
          <div className='sticky top-0 flex justify-between items-start mb-4'>
            <Dialog.Title className='text-xl font-bold text-white'>
              {title}
            </Dialog.Title>
            <Dialog.Close className='text-white hover:text-gray-300'>
              <button
                className='absolute top-0 right-0 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none'
                aria-label='Close'
              >
                ✕
              </button>
            </Dialog.Close>
          </div>

          {image && (
            <Image
              src={image}
              alt={title}
              className='w-full max-h-96 h-fit object-contain rounded mb-8'
              width={530}
              height={384}
            />
          )}

          <div className='text-white space-y-2'>
            <p className='text-gray-300'>
              {sinceTime} - {tillTime} - {stageName}
            </p>
            {description && (
              <p className='text-gray-300 font-sans text-sm'>{description}</p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
