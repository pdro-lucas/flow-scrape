'use server'

import prisma from '@/lib/prisma'
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from '@/schemas/workflow'
import { WorkFlowStatus } from '@/types/workflow'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function CreateWorkflow(form: CreateWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form)

  if (!success) {
    throw new Error('Invalid form data')
  }

  const { userId } = await auth()

  if (!userId) {
    throw new Error('unauthorized')
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkFlowStatus.DRAFT,
      definition: 'TODO',
      ...data,
    },
  })

  if (!result) {
    throw new Error('Failed to create workflow')
  }

  redirect(`/workflow/editor/${result.id}`)
}
