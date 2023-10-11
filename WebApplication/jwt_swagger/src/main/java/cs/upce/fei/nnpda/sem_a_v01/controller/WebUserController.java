package cs.upce.fei.nnpda.sem_a_v01.controller;

import cs.upce.fei.nnpda.sem_a_v01.dto.WebUserDto;
import cs.upce.fei.nnpda.sem_a_v01.entity.WebUser;
import cs.upce.fei.nnpda.sem_a_v01.service.ConversionService;
import cs.upce.fei.nnpda.sem_a_v01.service.WebUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/web_users")
public class WebUserController {

    private final WebUserService webUserService;

    public WebUserController(WebUserService webUserService) {
        this.webUserService = webUserService;
    }

    @GetMapping()
    public List<WebUserDto> getAllWebUsers(){
        return webUserService.findAll().stream().map(ConversionService::toWebUserDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public WebUserDto getOneWebUser(@PathVariable Integer id){
        WebUser webUser = webUserService.findById(id);
        return ConversionService.toWebUserDto(webUser);
    }

    @PostMapping
    public WebUserDto createWebUser(@RequestBody WebUserDto webUserDto){
        WebUser webUserToProcess = ConversionService.toWebUser(webUserDto);
        WebUser userToSave = webUserService.save(webUserToProcess);
        return ConversionService.toWebUserDto(userToSave);
    }

    @PutMapping("/{id}")
    public WebUserDto updateWebUser(@PathVariable Integer id, @RequestBody WebUserDto webUserDto){
        WebUser webUserToProcess = ConversionService.toWebUser(webUserDto);
        webUserToProcess.setId(id.longValue());
        WebUser userToSave = webUserService.save(webUserToProcess);
        return ConversionService.toWebUserDto(userToSave);
    }

    @DeleteMapping("/{id}")
    public void deleteWebUser(@PathVariable Integer id){
        webUserService.deleteById(id);
    }

}
