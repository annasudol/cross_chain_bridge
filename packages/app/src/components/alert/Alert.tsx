import React from 'react'
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { LinkComponent } from '../ui/LinkComponent'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { truncateMiddle } from '@/utils/format'
import { NotificationType } from '@/utils/types'
dayjs.extend(relativeTime)

interface StatusProps {
  className?: string
  type: NotificationType
}

interface Props {
  className?: string
  type: NotificationType
  message: string
  href?: string
  timestamp?: number
  from?: string
}

export function StatusIcon(props: StatusProps) {
  let className = 'h-6 w-6'
  if (props.className) className += ` ${props.className}`

  if (props.type === 'info') {
    className += ' stroke-info'
  }
  if (props.type === 'success') {
    className += ' stroke-success'
  }
  if (props.type === 'warning') {
    className += ' stroke-warning'
  }
  if (props.type === 'error') {
    className += ' stroke-error'
  }
  if (props.type === 'success') return <CheckCircleIcon className={className} />
  if (props.type === 'warning') return <ExclamationTriangleIcon className={className} />
  if (props.type === 'error') return <ExclamationCircleIcon className={className} />

  return <InformationCircleIcon className={className} />
}

export function Alert(props: Props) {
  let className = `alert flex flex-row text-left bg-white p-2 rounded-md gap-2`
  if (props.className) className += ` ${props.className}`
  return (
    <div className={className}>
      <div>
        <StatusIcon type={props.type} />
      </div>

      <div className='flex flex-col flex-grow'>
        <span className='text-xs whitespace-normal'>{props.message}</span>
        <div className='flex flex-row gap-2'>
          <span className='text-xs'>{dayjs(props.timestamp).fromNow()}</span>
          {props.from && (
            <>
              <span className='text-xs'> · </span>
              <span className='text-xs text-secondary'>
                {props.from.startsWith('0x') ? truncateMiddle(props.from) : props.from}
              </span>
            </>
          )}
        </div>
      </div>

      {props.href && (
        <LinkComponent href={props.href}>
          <ArrowUpRightIcon className='h-4 w-4' />
          Etherscan
        </LinkComponent>
      )}
    </div>
  )
}
