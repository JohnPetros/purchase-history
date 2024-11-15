<template>
  <div class="bg-[#141625] min-h-screen overflow-x-hidden">
    <aside
      class="fixed flex flex-col justify-between top-0 left-0 bottom-0 bg-slate-800 rounded-r-3xl"
    >
      <div
        class="grid place-content-center size-24 rounded-r-3xl bg-violet-500"
      >
        <img src="@/assets/images/logo.svg" alt="" />
      </div>
      <div class="w-full h-px border-t border-slate-600 mt-auto py-12"></div>
    </aside>
    <div class="mx-auto max-w-xl py-20">
      <slot></slot>
    </div>
  </div>
</template>