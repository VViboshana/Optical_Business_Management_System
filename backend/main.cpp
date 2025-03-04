#include <iostream>
#include <string>

using namespace std;

// Define the Link class
class Link {
public:
    string name;
    float average;
    Link* next;

    // Constructor to initialize the student details
    Link(string studentName, float studentAverage) {
        name = studentName;
        average = studentAverage;
        next = nullptr;
    }

    // Method to display student details
    void displayDetails() {
        cout << "Name: " << name << ", Average: " << average << endl;
    }
};

// Function to print the linked list
void printList(Link* head) {
    Link* temp = head;
    while (temp != nullptr) {
        temp->displayDetails();
        temp = temp->next;
    }
}

int main() {
    // Creating three student nodes
    Link* student1 = new Link("Nipuna", 53.5);
    Link* student2 = new Link("Aravinda", 78.0);
    Link* student3 = new Link("Prashani", 69.5);

    // Connecting the nodes
    student1->next = student2;
    student2->next = student3;

    // Printing the linked list
    cout << "Student Linked List:" << endl;
    printList(student1);

    // Freeing allocated memory
    delete student1;
    delete student2;
    delete student3;

    return 0;
}
