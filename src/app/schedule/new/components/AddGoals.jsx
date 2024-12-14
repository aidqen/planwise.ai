'use client'

import React, { useState } from 'react'
import { Plus, PlusCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'

export function AddGoals() {
    const [goals, setGoals] = useState([])
    const [currentGoal, setCurrentGoal] = useState('')
    const [nextId, setNextId] = useState(1)

    function addGoal() {
        if (currentGoal.trim()) {
            setGoals([...goals, { id: nextId, text: currentGoal.trim() }])
            setCurrentGoal('')
            setNextId(nextId + 1)
        }
    }

    function removeGoal(id) {
        setGoals(goals.filter(goal => goal.id !== id))
    }

    function handleSubmit(e) {
        e.preventDefault()
        addGoal()
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 rounded-xl overflow-hidden">
            {/* <CardContent className="p-6"> */}
                {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Set Your Goals</h2> */}
                <p className="text-xl font-semibold text-start w-full text-gray-800 mb-10">Define what you want to achieve</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            value={currentGoal}
                            onChange={(e) => setCurrentGoal(e.target.value)}
                            placeholder="Enter your goal"
                            className="flex-grow"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-[10px] w-10 h-10 flex items-center justify-center"
                        >
                            <Plus className="h-6 w-6" />
                        </Button>
                    </div>

                    <AnimatePresence>
                        {goals.map((goal) => (
                            <motion.div
                                key={goal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                                <span className="text-gray-800">{goal.text}</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeGoal(goal.id)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {goals.length > 0 && (
                        <Button type="button" className="w-full bg-green-500 hover:bg-green-600 text-white">
                            Save Goals
                        </Button>
                    )}
                </form>
            {/* </CardContent> */}
        </div>
    )
}
