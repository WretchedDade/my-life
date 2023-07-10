import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

export function Error({ error }: { error: Error }) {
	const [open, setOpen] = useState(false);
	console.table(error);

	return (
		<>
			<div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
				<header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
					<a href="/">
						<span className="sr-only">Living Made by Dade</span>
						<img className="h-10 w-auto sm:h-12" src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=500" alt="" />
					</a>
				</header>
				<main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
					<div className="max-w-lg">
						<p className="text-base font-semibold leading-8 text-red-600">ERROR</p>
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sorry...</h1>
						<p className="mt-6 text-base leading-7 text-gray-600">Looks like something went wrong</p>
						<div className="mt-4">
							<a href={document.location.origin} className="text-sm font-semibold leading-7 text-blue-600">
								<span aria-hidden="true">&larr;</span> Back to home
							</a>
						</div>
						{import.meta.env.DEV && (
							<button
								type="button"
								onClick={() => setOpen(true)}
								className="mt-10 hidden rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 lg:block">
								View Error Details
							</button>
						)}
					</div>
				</main>
				<div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
					<img src="https://source.unsplash.com/qgJ1rt7TeeY" alt="" className="absolute inset-0 h-full w-full object-cover" />
				</div>
			</div>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl sm:p-6">
									<div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
										<button
											type="button"
											className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											onClick={() => setOpen(false)}>
											<span className="sr-only">Close</span>
											<XMarkIcon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
										</div>
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
												Error Details
											</Dialog.Title>
											<div className="mt-6">
												<pre className="border-2 border-red-500 bg-red-100 p-4 text-red-700">{error.stack}</pre>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}
