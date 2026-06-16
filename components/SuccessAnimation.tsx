"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
    >
      <CheckCircle2 className="h-5 w-5" />
      <span className="text-sm font-medium">Vehicle found successfully!</span>
    </motion.div>
  );
}
