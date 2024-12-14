package com.ems.controller;

import com.ems.Utils.Result;
import com.ems.Utils.ResultUtil;
import com.ems.entity.Student;
import com.ems.service.StudentService;


import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Resource
    private StudentService studentService;

    @PostMapping("/add")
    public Result add(@RequestBody Student student){
        studentService.add(student);
        return ResultUtil.success();
    }

    @PutMapping("/update")
    public Result update(@RequestBody Student student){
        studentService.updateById((student));
        return ResultUtil.success();
    }
    @DeleteMapping("/deleteById/{id}")
    public Result deleteById(@PathVariable Integer id){
        studentService.deleteById(id);
        return ResultUtil.success();
    }
    //分页查询
    @GetMapping("/selectPage")
    public Result selectPage(Student student,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "5") Integer pageSize){
        PageInfo<Student>pageInfo = studentService.selectPage(student,pageNum,pageSize);
        return ResultUtil.success(pageInfo);
    }
}
