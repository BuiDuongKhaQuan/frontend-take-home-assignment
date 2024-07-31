import * as Tabs from '@radix-ui/react-tabs'
import { useRouter, useSearchParams } from 'next/navigation'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

const Index = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? ''
  const handleTabChange = (tabValue: string) => {
    if (tabValue === '') {
      router.replace(window.location.origin)
      return
    }
    router.replace(`${window.location.origin}/?tab=${tabValue}`)
  }
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <div>
          <Tabs.Root
            className="TabsRoot pt-10"
            value={tab}
            onValueChange={handleTabChange}
          >
            <Tabs.List
              className="TabsList justify-flex-start flex items-center gap-x-2 "
              aria-label="Manage your account"
            >
              <TabsTrigger value="" label={'All'} />
              <TabsTrigger value={'pending'} label={'Pending'} />
              <TabsTrigger value={'completed'} label={'Completed'} />
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="all" />
            <Tabs.Content className="TabsContent" value="pending" />
            <Tabs.Content className="TabsContent" value="completed" />
          </Tabs.Root>
        </div>
        <div className="pt-10">
          <TodoList tab={tab} />
        </div>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

const TabsTrigger = ({ label, value }: { label: string; value: string }) => {
  return (
    <Tabs.Trigger
      className="TabsTrigger rounded-full border border-gray-300 px-6 py-3 text-sm font-bold data-[state=active]:border-none data-[state=active]:bg-gray-700 data-[state=active]:text-white"
      value={value}
    >
      {label}
    </Tabs.Trigger>
  )
}

export default Index
