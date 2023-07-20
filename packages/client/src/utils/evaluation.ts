import { EvaluationEnum } from '@prisma/client'

export default function getEvaluation(value: EvaluationEnum) {
  switch (value) {
    case 'STRONG_YES':
      return '🏆 Strong Yes'
    case 'YES':
      return '👍 Yes'
    case 'NO':
      return '👎 No'
    case 'STRONG_NO':
      return '🚫 Strong No'
  }
}
