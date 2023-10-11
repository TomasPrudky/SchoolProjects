package cs.upce.fei.nnpda.sem_a_v01.controller;

import cs.upce.fei.nnpda.sem_a_v01.entity.EmailDetails;
import cs.upce.fei.nnpda.sem_a_v01.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;
    //public void sendMail(String to, String subject, String body) {
    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailDetails details) {
        emailService.sendMail(details.getRecipient(), details.getSubject(), details.getMsgBody());
        return "status";
    }

    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(@RequestBody EmailDetails details) {
        emailService.sendMail(details.getRecipient(), details.getSubject(), details.getMsgBody());
        return "status";
    }
}
