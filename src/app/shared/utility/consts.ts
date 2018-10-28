export const Role = {
    Requester: "China Tax Workflow Requesters",
    SiteTaxTeam: "China Tax Workflow Site Tax Team",
    Reviewer: "China Tax Workflow Reviewers",
    ApproverWL2: "China Tax Workflow Approvers WL2",
    ApproverWL3: "China Tax Workflow Approvers WL3",
    ApproverWL4: "China Tax Workflow Approvers WL4",
    ApproverWL5: "China Tax Workflow Approvers WL5",
    Admin: "China Tax Workflow Administrators",
    PTP: "China Tax Workflow PTP Team"
};

export const ContractFilingRequestStatus = {
    Draft: "Draft",
    PendingSiteTaxTeam: "Pending - Site Tax Team",
    Active: "Active",
    Returned: "Returned",
    Closed: "Closed",
    Cancelled: "Cancelled"
}

export const PaymentRequestStatus = {
    Draft: "Draft",
    PendingSiteTaxTeam: "Pending - Site Tax Team",
    PendingReviewer: "Pending - Reviewer",
    PendingApproverWL2: "Pending - Approver WL2",
    PendingApproverWL3: "Pending - Approver WL3",
    PendingApproverWL4: "Pending - Approver WL4",
    PendingApproverWL5: "Pending - Approver WL5",
    ReturnedFromSiteTaxTeam: "Returned - From Site Tax Team",
    ReturnedFromReviewer: "Returned - From Reviewer",
    ReturnedFromApprover: "Returned - From Approver",
    Approved: "Approved",
    PendingPTP: "Pending - PTP Team",
    Closed: "Closed",
    Cancelled: "Cancelled"
}

export const PaymentRequestStage = {
    SiteTaxTeamStage: 1,
    ReviewerStage: 2,
    ApproverWL2Stage: 3,
    ApproverWL3Stage: 4,
    ApproverWL4Stage: 5,
    ApproverWL5Stage: 6,
    PTP: 7,
}

export const SideNavBarMenuId = {
    ContractFilingRequest: 1,
    PaymentRequest: 2,
    SiteTaxTeam: 3,
    Review: 4,
    Approval: 5,
    ExceptionRequest: 6,
    Admin: 7,
    SupportingDocuments: 8,
    PTP: 9
}

export const TopNavBarMenuId = {
    MyContractFilingRequeset: 1,
    NewContractFilingRequeset: 2,
    MyPaymentRequeset: 3,
    ContractFilingRequestTasks: 4,
    PaymentRequestTasksForSiteTaxTeam: 5,
    AllContractFilingRequestsForSiteTaxTeam: 6,
    AllPaymentRequestsForSiteTaxTeam: 7,
    PaymentRequestTasksForReviewer: 8,
    AllContractFilingRequestsForReviewer: 9,
    AllPaymentRequestsForReviewer: 10,
    PaymentRequestTasksForApprover: 11,
    AllContractFilingRequestsForApprover: 12,
    AllPaymentRequestsForApprover: 13,
    ExceptionRequest: 14,
    Admin: 15,
    SupportingDocuments: 16,
    AllPaymentRequestsForPTPTeam: 17
}

export const ApproverThreshold = {
    ApproverWL3: 500000,
    ApproverWL4: 10000000,
    ApproverWL5: 50000000
}

export const DialogFollowingAction = {
    Refresh: 1
}

export const Message = {
    ErrorMessage: "Error occured",
    SaveDraftSuccessfully: "The draft has been saved.",
    SubmitContractFilingRequestSuccessfully: "The contract filing request has been submitted.",
    SubmitPaymentRequestSuccessfully: "The payment request has been submitted.",
    CloseContractFilingRequestSuccessfully: "The contract filing request has been closed.",
    CancelContractFilingRequestSuccessfully: "The contract filing request has been cancelled.",
    ChangeContractFilingRequestOwnerSuccessfully: "The owner has been changed.",
    ClosePaymentRequestSuccessfully: "The payment request has been closed.",
    CancelPaymentRequestSuccessfully: "The payment request has been cancelled.",
    UploadTaxDocumentSuccessfully: "The tax documents have been uploaded.",
    ApproveContractFilingRequest: "The contract filing request has been approved.",
    RejectContractFilingRequest: "The contract filing request has been rejected.",
    ApprovePaymentRequest: "The payment request has been approved.",
    RejectPaymentRequest: "The payment request has been rejected.",
}