package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"gorgonia.org/gorgonia"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	// Create a computation graph
	g := gorgonia.NewGraph()

	// Define input and target data
	inputData := gorgonia.NewMatrix(g, gorgonia.Float64, gorgonia.WithShape(1, 2), gorgonia.WithValue(gorgonia.NewMatrixValue(gorgonia.Float64, gorgonia.WithShape(1, 2), gorgonia.WithValue([]float64{0.1, 0.2}))))
	targetData := gorgonia.NewMatrix(g, gorgonia.Float64, gorgonia.WithShape(1, 1), gorgonia.WithValue(gorgonia.NewMatrixValue(gorgonia.Float64, gorgonia.WithShape(1, 1), gorgonia.WithValue([]float64{0.8}))))

	// Define parameters (weights and bias)
	w := gorgonia.NewMatrix(g, gorgonia.Float64, gorgonia.WithShape(2, 1), gorgonia.WithInit(gorgonia.GlorotU(1)))
	b := gorgonia.NewMatrix(g, gorgonia.Float64, gorgonia.WithShape(1), gorgonia.WithInit(gorgonia.Zeroes()))

	// Define the neural network model
	// Activation function: Sigmoid
	// Output = sigmoid(input * weights + bias)
	output := gorgonia.Must(gorgonia.Add(gorgonia.Must(gorgonia.Mul(inputData, w)), b))
	output = gorgonia.Must(gorgonia.Sigmoid(output))

	// Define the loss function (Mean Squared Error)
	loss := gorgonia.Must(gorgonia.Mean(gorgonia.Must(gorgonia.Square(gorgonia.Must(gorgonia.Sub(output, targetData))))))

	// Define the optimization operation (Gradient Descent)
	grads, err := gorgonia.Gradient(loss, w, b)
	if err != nil {
		log.Fatal(err)
	}

	// Create a VM to run the computations
	machine := gorgonia.NewTapeMachine(g, gorgonia.BindDualValues(w, b))

	// Training loop (Gradient Descent)
	learningRate := 0.01
	epochs := 1000

	for epoch := 0; epoch < epochs; epoch++ {
		if err := machine.RunAll(); err != nil {
			log.Fatal(err)
		}

		// Update weights and bias using gradient descent
		gorgonia.WithLearnRate(grads, -learningRate)
		if _, err := gorgonia.ApplyUpdates(w, grads[0], gorgonia.UseScale(true)); err != nil {
			log.Fatal(err)
		}
		if _, err := gorgonia.ApplyUpdates(b, grads[1], gorgonia.UseScale(true)); err != nil {
			log.Fatal(err)
		}

		// Reset the VM for the next iteration
		machine.Reset()
	}

	// Run the final trained model
	if err := machine.RunAll(); err != nil {
		log.Fatal(err)
	}

	// Display the final results
	fmt.Println("Trained Weights:")
	fmt.Println(w.Value())

	fmt.Println("Trained Bias:")
	fmt.Println(b.Value())

	fmt.Println("Predicted Output:")
	fmt.Println(output.Value())
}


func generateTrainingData() ([][]float64, []float64) {
	numSamples := 1000
	inputSize := 2

	trainingData := make([][]float64, numSamples)
	target := make([]float64, numSamples)

	for i := 0; i < numSamples; i++ {
		sample := make([]float64, inputSize)
		for j := 0; j < inputSize; j++ {
			sample[j] = mathrand.Float64()
		}
		trainingData[i] = sample
		target[i] = sample[0] + sample[1]
	}

	return trainingData, target
}
